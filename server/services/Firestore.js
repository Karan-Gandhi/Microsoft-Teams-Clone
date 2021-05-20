const admin = require("firebase-admin");
const CacheStore = require("./cache.js");

const cache = new CacheStore();
let applicationRegistered = false;
let db = null;

const registerApplication = () => {
    if (applicationRegistered) return;
    const serviceAccount = require("../keys/firebase-service-account-key.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    applicationRegistered = true;
    db = admin.firestore();
};

const addData = async (collection, document, data) => {
    if (data) {
        return await db.collection(collection).doc(document).set(data);
    } else {
        data = document;
        if (collection.indexOf("/") != -1) {
            document = collection.substr(collection.indexOf("/") + 1, collection.length - collection.indexOf("/"));
            collection = collection.substr(0, collection.indexOf("/"));
            return await db.collection(collection).doc(document).set(data);
        } else return await db.collection(collection).add(document);
    }
};

const updateData = async (collection, document, data) => {
    return await db.collection(collection).doc(document).update(data);
};

const deleteData = async (collection, document) => {
    if (typeof document === "string" || document instanceof String) {
        return await db.collection(collection).doc(document).delete();
    } else {
        const collectionRef = db.collection(collection);
        const batchSize = document;
        const query = collectionRef.orderBy("__name__").limit(batchSize);

        return new Promise((resolve, reject) => {
            deleteQueryBatch(query, resolve).catch(reject);
        });
    }
};

const deleteQueryBatch = async (query, resolve) => {
    const snapshot = await query.get();
    const batchSize = snapshot.size;

    if (batchSize == 0) {
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

const readData = async (collection, document) => {
    if (document) {
        const path = collection + "/" + document;
        if (cache.has(path)) return cache.getItem(path);
        const doc = await db.collection(collection).doc(document).get();

        if (doc.exists) return cache.addItem(path, doc.data());
        else return null;
    } else {
        if (cache.has(collection)) return cache.getItem(collection);

        const snapshot = await db.collection(collection).get();
        let data = [];

        snapshot.forEach(doc => {
            data.push(doc.data());
        });

        return cache.addItem(collection, data);
    }
};

module.exports = { registerApplication, addData, updateData, deleteData, readData };
