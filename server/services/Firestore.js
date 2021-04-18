const admin = require("firebase-admin");
let applicationRegistered = false;

const registerApplication = () => {
    if (applicationRegistered) return;
    const serviceAccount = require("../keys/firebase-service-account-key.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    applicationRegistered = true;
};

const addData = async (collection, document, data) => {
    if (data) {
        return await admin.firestore().collection(collection).doc(document).set(data);
    } else {
        data = document;
        if (collection.indexOf('/') != -1) {
            document = collection.substr(collection.indexOf('/') + 1, collection.length - collection.indexOf('/'));
            collection = collection.substr(0, collection.indexOf('/'));
            return await admin.firestore().collection(collection).doc(document).set(data);
        } else return await admin.firestore().collection(collection).add(document);
    }
};

const updateData = async (collection, document, data) => {

};

module.exports = { registerApplication, addData, updateData }