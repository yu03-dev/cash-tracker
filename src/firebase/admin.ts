import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = require("next-study-d2f7f-firebase-adminsdk-ph0ss-33e4d251cc.json");
export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(serviceAccount),
  });

export const auth = getAuth();
export const db = getFirestore();
