import React from 'react';
import { NavMenu } from './NavMenu';
import '../styles/header.css';

export const Header = ({ isLoggedIn }) => {

    return (
        <div className="headerContainer">
            <h1>StoreWorks</h1>
            {isLoggedIn ? <NavMenu isLoggedIn={isLoggedIn} /> : null}
        </div>
    )
}