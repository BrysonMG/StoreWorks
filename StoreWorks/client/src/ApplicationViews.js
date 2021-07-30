import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/Login';
import firebase from 'firebase';
import { EmployeeWelcome } from './components/EmployeeWelcome';
import { getEmployeeByEmail } from './modules/employeeManager';
import { Sales } from './components/Sales';

export const ApplicationViews = ({ isLoggedIn }) => {
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
        getCanManage();
    })

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    {() => {
                        if (!isLoggedIn) {
                            return (<Redirect to="/Login" />)
                        } else {
                            if (userCanManage) {
                                //return (<Summary />)
                                return (<h1>MANAGER</h1>)
                            } else {
                                return (<EmployeeWelcome />)
                            }
                        }
                    }}
                </Route>
                <Route exact path="/Login">
                    {isLoggedIn ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route exact path="/Sales">
                    {!isLoggedIn ? <Redirect to="/" /> : <Sales />}
                </Route>
            </Switch>
        </main>
    )
}