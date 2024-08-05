"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdTokenResult
} from 'firebase/auth'
import {auth} from './firebase';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
  
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idTokenResult = await getIdTokenResult(currentUser);
        setUser(currentUser);
        setAdmin(idTokenResult.claims.admin);
      } else {
        setUser(null);
        setAdmin(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{createUser, signIn, logout, user, admin}}>
      {children}
    </UserContext.Provider>
  )
};

export const UserAuth = () => {
  return useContext(UserContext);
}