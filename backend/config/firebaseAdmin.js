// config/firebaseAdmin.js
import admin from "firebase-admin";
import fs from "fs";

// Lee el JSON manualmente
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./firebaseServiceAccountKey.json", import.meta.url))
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
