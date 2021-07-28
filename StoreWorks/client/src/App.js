import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { onLoginStatusChange } from './modules/authManager';
import firebase from 'firebase';
import "firebase/auth";
import { Header } from './components/Header';
import { Login } from './components/Login';
import { ApplicationViews } from './ApplicationViews';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, [])

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
