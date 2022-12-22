// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

import {
  doc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const create = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signInSocial = async (name) => {
  let provider;
  if (name === "google") provider = new GoogleAuthProvider();
  else if (name === "gh") provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};

const db = getFirestore();
const col = collection(db, "nweets");
const getQuery = query(col, orderBy("createdAt", "desc"));

const add = (nweet, uid) => {
  return addDoc(col, {
    text: nweet,
    createdAt: Date.now(),
    creatorId: uid,
  });
};

const del = (id) => {
  return deleteDoc(doc(db, "nweets", `${id}`));
};

const update = (id, nweet) => {
  return updateDoc(doc(db, "nweets", `${id}`), {
    text: nweet,
  });
};

const gets = () => {
  return getDocs(getQuery);
};

const onSnapShot = (callback) => {
  return onSnapshot(getQuery, callback);
};

export const dbService = {
  db: db,
  getQuery: getQuery,
  add: add,
  del: del,
  gets: gets,
  update: update,
  onSnapshot: onSnapShot,
};

export const authService = {
  auth: auth,
  create: create,
  signIn: signIn,
  signInSocial: signInSocial,
  signOut: () => signOut(auth),
};

export default app;
