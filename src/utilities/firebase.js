import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBf9_Q32iaMEW46oOrLVqDTX5rEtb-pbJ8",
    authDomain: "cs394-scheduler-36669.firebaseapp.com",
    databaseURL: "https://cs394-scheduler-36669-default-rtdb.firebaseio.com",
    projectId: "cs394-scheduler-36669",
    storageBucket: "cs394-scheduler-36669.appspot.com",
    messagingSenderId: "488084563602",
    appId: "1:488084563602:web:42e7d98dae30f7a6e8684b",
    measurementId: "G-WZQHG81C35"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };

export const setData = (path, value) => (
    set(ref(database, path), value)
  );

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };