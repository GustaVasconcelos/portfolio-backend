import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: firebasePrivateKey,
        client_email: process.env.FIREBASE_CLIENT_EMAIL
    }),
    storageBucket: process.env.STORAGE_FIREBASE
});

const bucket = admin.storage().bucket();

export default bucket;
