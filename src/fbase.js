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

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { v4 } from "uuid";

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

const add = async (nweet, uid, attachment) => {
  let url = "";
  if (attachment !== "") {
    url = await upload(attachment, uid);
  }

  return addDoc(col, {
    text: nweet,
    createdAt: Date.now(),
    creatorId: uid,
    attachmentUrl: url,
  });
};

const del = async (nweetObj) => {
  try {
    await deleteDoc(doc(db, "nweets", `${nweetObj.id}`));

    if (nweetObj.attachmentUrl !== "") {
      const storageRef = ref(storage, nweetObj.attachmentUrl);
      console.log(nweetObj.attachmentUrl);
      await deleteObject(storageRef);
      console.log("deleted successfully.");
    }
  } catch (error) {
    console.log(error);
  }
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

const storage = getStorage();

const upload = async (attachment, uid) => {
  const fileRef = ref(storage, `${uid}/${v4()}`);
  const response = await uploadString(fileRef, attachment, "data_url");
  const url = await getDownloadURL(response.ref);

  return url;
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

export const storageService = {
  storage: storage,
  upload: upload,
};

export default app;
