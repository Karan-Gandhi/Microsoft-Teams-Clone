import { db } from "./Firebase";
import Cache from "./Cache";

export const firebaseCache = new Cache("cache/firebase.cache");
firebaseCache.fromFile();

export const addData = async <T>(
  collection: string,
  document: string,
  data: T
): Promise<FirebaseFirestore.WriteResult> => {
  firebaseCache.addItem(collectionAndDocumentToId(collection, document), data);
  return await db.collection(collection).doc(document).set(data);
};

export const readData: {
  <T>(collection: string): Promise<T[]>;
  <T>(collection: string, document: string): Promise<T>;
} = async <T>(collection: string, document?: string) => {
  if (!!document) {
    if (
      firebaseCache.itemExists(collectionAndDocumentToId(collection, document))
    ) {
      return firebaseCache.getItem(
        collectionAndDocumentToId(collection, document)
      ) as T;
    }
    const doc = await db.collection(collection).doc(document).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data() as T;
    firebaseCache.addItem(
      collectionAndDocumentToId(collection, document),
      data
    );
    return data;
  } else {
    if (firebaseCache.itemExists(collection))
      return firebaseCache.getItem(collection) as T[];
    const snapshots = await db.collection(collection).get();
    const res: T[] = [];
    snapshots.forEach((snapshot) => res.push(snapshot.data() as T));
    firebaseCache.addItem(collection, res);
    return res;
  }
};

export const deleteData = async (collection: string, document?: string) => {
  if (!!document) {
    return await db.collection(collection).doc(document).delete();
  } else {
    const deleteCollection = async (
      collectionPath: string,
      batchSize: number
    ) => {
      const collectionRef = db.collection(collectionPath);
      const query = collectionRef.orderBy("__name__").limit(batchSize);

      return new Promise((resolve, reject) => {
        deleteQueryBatch(query, resolve).catch(reject);
      });
    };

    const deleteQueryBatch = async (
      query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
      resolve: (value?: unknown) => void
    ) => {
      const snapshot = await query.get();

      const batchSize = snapshot.size;
      if (batchSize === 0) {
        resolve();
        return;
      }

      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      process.nextTick(() => {
        deleteQueryBatch(query, resolve);
      });
    };
    return await deleteCollection(collection, 10);
  }
};

export const readDataWhere = async <T>(
  collection: string,
  fieldPath: string,
  opStr: FirebaseFirestore.WhereFilterOp,
  value: any
): Promise<T[]> => {
  const snapshots = await db
    .collection(collection)
    .where(fieldPath, opStr, value)
    .get();
  const res: T[] = [];

  snapshots.forEach((snapshot) => res.push(snapshot.data() as T));

  return res;
};

export const getSnapshotWhere = (
  collection: string,
  fieldPath: string,
  opStr: FirebaseFirestore.WhereFilterOp,
  value: any
): FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =>
  db.collection(collection).where(fieldPath, opStr, value);

const collectionAndDocumentToId = (collection: string, document: string) =>
  `${collection}/${document}`;
