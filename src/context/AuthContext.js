import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, methods } from "../firebase";

const AuthContext = createContext(); //Used inside of AuthProvider

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(); //store current user
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    return methods.createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return methods.signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return methods.signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      setLoading(false);
    }); //Unscubscribe from onAuthStateChanged event when finished
    //changes in login and Registration

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
