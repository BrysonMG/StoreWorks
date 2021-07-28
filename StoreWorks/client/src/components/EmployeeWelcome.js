import React, { useState, useEffect } from 'react';
import { getEmployeeByEmail } from '../modules/employeeManager';
import firebase from 'firebase';

export const EmployeeWelcome = () => {
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const getEmployee = () => {
        if (firebase.auth().currentUser !== null) {
            getEmployeeByEmail(firebase.auth().currentUser.email)
                .then(employee => {
                    setCurrentEmployee(employee);
                })
        }
    }

    useEffect(() => {
        getEmployee();
    }, [])

    return (
        <div className="welcomeContainer">
            <h3>{`Hello ${currentEmployee?.employeeName}!`}</h3>
            <h4>You may navigate to Sales, Receiving, or Shrinkage.</h4>
        </div>
    )
}