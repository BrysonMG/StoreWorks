import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { onLoginStatusChange } from './modules/authManager';
import { getEmployeeByEmail } from './modules/employeeManager'
import firebase from 'firebase';
import { Header } from './components/Header';
import { ApplicationViews } from './ApplicationViews';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCanManage, setUserCanManage] = useState(false);

  const getCanManage = () => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      getEmployeeByEmail(user.email)
        .then(employee => {
          setUserCanManage(employee.canManage);
        })
    }
  }


  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, [])

  useEffect(() => {
    getCanManage();
  }, [])

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} canManage={userCanManage} />
      <ApplicationViews isLoggedIn={isLoggedIn} canManage={userCanManage} />
    </Router>
  );
}

export default App;
