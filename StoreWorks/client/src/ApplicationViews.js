import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/Login';
import firebase from 'firebase';
import { EmployeeWelcome } from './components/EmployeeWelcome';

export const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <main>
            <Switch>
                <Route exact path="/">
                    {isLoggedIn ? <EmployeeWelcome /> : <Login />}
                </Route>
            </Switch>
        </main>
    )
}