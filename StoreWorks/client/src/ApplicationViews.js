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
import { EditProductForm } from './components/EditProductForm';
import { Register } from './components/Register';
import { EmployeeMgmt } from './components/EmployeeMgmt';
import { EditEmployeeForm } from './components/EditEmployeeForm';
import { Summary } from './components/Summary';

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
                                return (<Summary />)
                            } else {
                                return (<EmployeeWelcome />)
                            }
                        }
                    }}
                </Route>
                <Route exact path="/Register">
                    {isLoggedIn ? <Redirect to="/" /> : <Register />}
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
                    {!isLoggedIn ? <Redirect to="/" /> : <EmployeeMgmt />}
                </Route>
                <Route exact path="/AddProduct">
                    {!isLoggedIn ? <Redirect to="/" /> : <AddProductForm />}
                </Route>
                <Route exact path="/EditProduct/:productId(\d+)">
                    {!isLoggedIn ? <Redirect to="/" /> : <EditProductForm />}
                </Route>
                <Route exact path="/EditEmployee/:employeeId(\d+)">
                    {!isLoggedIn ? <Redirect to="/" /> : <EditEmployeeForm />}
                </Route>
            </Switch>
        </main>
    )
}