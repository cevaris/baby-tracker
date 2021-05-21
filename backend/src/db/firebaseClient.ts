import admin from 'firebase-admin';

// gcloud config set project acardenas-baby-tracker

admin.initializeApp();

export const firebaseDb: FirebaseFirestore.Firestore =
    admin.firestore();