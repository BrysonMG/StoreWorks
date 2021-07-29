import React from 'react';
import { NavMenu } from './NavMenu';

export const Header = ({ isLoggedIn }) => {

    return (
        <div className="headerContainer">
            <h1>StoreWorks</h1>
            {isLoggedIn ? <NavMenu isLoggedIn={isLoggedIn} /> : null}
        </div>
    )
}