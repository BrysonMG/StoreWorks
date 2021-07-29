import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { onLoginStatusChange } from './modules/authManager';
import { Header } from './components/Header';
import { ApplicationViews } from './ApplicationViews';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
