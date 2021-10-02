import { db } from "./firebase";

export const addData = async <T>(collection: string, document: string, data: T): Promise<FirebaseFirestore.WriteResult> => {
	return await db.collection(collection).doc(document).set(data);
};

export const readData = async <T>(collection: string, document?: string) => {
	if (!!document) {
		return (await db.collection(collection).doc(document).get()).data();
	} else {
		const snapshots = await db.collection(collection).get();
		const res: T[] = [];
		snapshots.forEach(snapshot => res.push(snapshot.data() as T));
		return res;
	}
};

export const deleteData = async (collection: string, document?: string) => {
	if (!!document) {
		return await db.collection(collection).doc(document).delete();
	} else {
		const deleteCollection = async (collectionPath: string, batchSize: number) => {
			const collectionRef = db.collection(collectionPath);
			const query = collectionRef.orderBy("__name__").limit(batchSize);

			return new Promise((resolve, reject) => {
				deleteQueryBatch(query, resolve).catch(reject);
			});
		};

		const deleteQueryBatch = async (query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>, resolve: (value?: unknown) => void) => {
			const snapshot = await query.get();

			const batchSize = snapshot.size;
			if (batchSize === 0) {
				resolve();
				return;
			}

			const batch = db.batch();
			snapshot.docs.forEach(doc => {
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

export const readDataWhere = async <T>(collection: string, fieldPath: string, opStr: FirebaseFirestore.WhereFilterOp, value: any) => {
	const snapshots = await db.collection(collection).where(fieldPath, opStr, value).get();
	const res: T[] = [];

	snapshots.forEach(snapshot => res.push(snapshot.data() as T));

	return res;
};
