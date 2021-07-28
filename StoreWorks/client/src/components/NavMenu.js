import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../modules/authManager';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from "reactstrap";

export const NavMenu = ({ isLoggedIn, canManage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            {isLoggedIn &&
                <div className="navMenu">
                    <Navbar>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="navOptions" navbar>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">{canManage ? 'Summary' : 'Welcome'}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Sales">Sales</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Receiving">Receiving</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/Shrinkage">Shrinkage</NavLink>
                                </NavItem>
                                {canManage &&
                                    <>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} to="ProductMgmt">Product Management</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={RRNavLink} to="EmployeeMgmt">Employee Management</NavLink>
                                        </NavItem>
                                    </>
                                }
                                <NavItem>
                                    <a style={{ cursor: "pointer" }} onClick={logout} >Logout</a>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            }
        </>
    )
}