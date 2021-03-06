import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../modules/authManager';
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { getEmployeeByEmail } from '../modules/employeeManager';
import firebase from "firebase";
import '../styles/nav.css';

export const NavMenu = () => {
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
    }, [])

    return (
        <>
            <div className="navMenu">
                <Navbar>
                    <Nav className="navOptions" navbar>
                        <NavItem className="navItem">
                            <NavLink className="navLink" tag={RRNavLink} to="/">{userCanManage ? 'Summary' : 'Welcome'}</NavLink>
                        </NavItem>
                        <NavItem className="navItem">
                            <NavLink className="navLink" tag={RRNavLink} to="/Sales">Sales</NavLink>
                        </NavItem>
                        <NavItem className="navItem">
                            <NavLink className="navLink" tag={RRNavLink} to="/Receiving">Receiving</NavLink>
                        </NavItem>
                        <NavItem className="navItem">
                            <NavLink className="navLink" tag={RRNavLink} to="/Shrinkage">Shrinkage</NavLink>
                        </NavItem>
                        {userCanManage &&
                            <>
                                <NavItem className="navItem">
                                    <NavLink className="navLink" tag={RRNavLink} to="/ProductMgmt">Product Management</NavLink>
                                </NavItem>
                                <NavItem className="navItem">
                                    <NavLink className="navLink" tag={RRNavLink} to="/EmployeeMgmt">Employee Management</NavLink>
                                </NavItem>
                            </>
                        }
                        <NavItem>
                            <button style={{ cursor: "pointer" }} onClick={logout} >Logout</button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        </>
    )
}