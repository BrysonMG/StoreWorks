import React, { useState } from 'react';
import Hamburger from 'hamburger-react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../modules/authManager';
import { Collapse, Navbar, Nav, NavItem, NavLink, NavbarToggler } from "reactstrap";

import firebase from 'firebase';
import 'firebase/auth';

export const Header = ({ isLoggedIn, canManage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="headerContainer">
            <h1>StoreWorks</h1>
            <Hamburger toggled={isOpen} toggle={toggle} />
            <ul className={`navMenu ${isOpen ? " showMenu" : ""}`}>

            </ul>
        </div>
    )
}