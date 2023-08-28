import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const encodedServiceAccountKey = Buffer.from(
  process.env.FB_SERVICE_ACCOUNT_KEY!,
  "base64"
).toString();
const serviceAccount = JSON.parse(encodedServiceAccountKey);
// const serviceAccount = require("next-study-d2f7f-firebase-adminsdk-ph0ss-33e4d251cc.json");
export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(serviceAccount),
  });

export const auth = getAuth();
export const db = getFirestore();
