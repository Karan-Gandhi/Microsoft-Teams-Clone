import * as admin from "firebase-admin";
import serviceAccount from "../credentials/serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();
