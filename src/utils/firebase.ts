import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebase from 'firebase/app';

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGIN_ID,
  appId: process.env.FIREBASE_APP_ID,
};

type UseFirebase = (() => firebase.app.App | undefined) &
  ((key: 'auth') => firebase.auth.Auth | undefined) &
  ((key: 'firestore') => firebase.firestore.Firestore | undefined) &
  ((key: 'storage') => firebase.storage.Storage | undefined);

export const useFirebase: UseFirebase = (key?: string) => {
  if (!firebaseConfig.projectId) {
    return undefined;
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  if (key) {
    const service = firebase[key];
    return service();
  }
  return firebase;
};
