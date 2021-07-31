import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/Login';
import firebase from 'firebase';
import { EmployeeWelcome } from './components/EmployeeWelcome';
import { getEmployeeByEmail } from './modules/employeeManager';
import { Sales } from './components/Sales';
import { Receiving } from './components/Receiving';
import { Shrinkage } from './components/Shrinkage';
import { ProductMgmt } from './components/ProductMgmt';
import { AddProductForm } from './components/AddProductForm';

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
                <Route exact path="/Register">
                    {null}
                </Route>
                <Route exact path="/Login">
                    {isLoggedIn ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route exact path="/Sales">
                    {!isLoggedIn ? <Redirect to="/" /> : <Sales />}
                </Route>
                <Route exact path="/Receiving">
                    {!isLoggedIn ? <Redirect to="/" /> : <Receiving />}
                </Route>
                <Route exact path="/Shrinkage">
                    {!isLoggedIn ? <Redirect to="/" /> : <Shrinkage />}
                </Route>
                <Route exact path="/ProductMgmt">
                    {!isLoggedIn ? <Redirect to="/" /> : <ProductMgmt />}
                </Route>
                <Route exact path="/EmployeeMgmt">
                    {!isLoggedIn ? <Redirect to="/" /> : null}
                </Route>
                <Route exact path="/AddProduct">
                    {!isLoggedIn ? <Redirect to="/" /> : <AddProductForm />}
                </Route>
                <Route exact path="/EditProduct/:id(\d+)">
                    {!isLoggedIn ? <Redirect to="/" /> : null}
                </Route>
                <Route exact path="/EditEmployee/:id(\d+)">
                    {!isLoggedIn ? <Redirect to="/" /> : null}
                </Route>
            </Switch>
        </main>
    )
}