import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { login } from '../modules/authManager';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/login.css'

export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();

    const loginSubmit = event => {
        event.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Form onSubmit={loginSubmit}>
            <fieldset>
                <FormGroup className="formGroup">
                    <Label className="loginLabel" for="email">Email: </Label>
                    <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup className="formGroup">
                    <Label className="loginLabel" for="password">Password: </Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup className="formGroup">
                    <Button id="loginButton">Login</Button>
                </FormGroup>
                <em>
                    Not registered? <Link to="Register">Register</Link>
                </em>
            </fieldset>
        </Form>
    )
}