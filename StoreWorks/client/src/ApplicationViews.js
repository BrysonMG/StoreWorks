import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/Login';
import firebase from 'firebase';
import { EmployeeWelcome } from './components/EmployeeWelcome';

export const ApplicationViews = ({ isLoggedIn, canManage }) => {
    return (
        <main>
            <Switch>
                <Route exact path="/">
                    {() => {
                        if (!isLoggedIn) {
                            return (<Redirect to="/Login" />)
                        } else {
                            if (canManage) {
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
            </Switch>
        </main>
    )
}