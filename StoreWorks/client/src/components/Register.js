import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";
import { FormGroup } from "reactstrap";
import '../styles/login.css'

export const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [email, setEmail] = useState("");

    const history = useHistory();

    const registerSubmit = event => {
        event.preventDefault();
        if (password && password !== confirmPw) {
            alert("Passwords do not match. Please try again.")
        } else {
            const employee = {
                Email: email,
                EmployeeName: name,
                CanManage: false
            }
            register(employee, password)
                .catch((ex) => {
                    alert(ex.message);
                    clearForm();
                })
                .then(() => history.push("/"))
        }
    }

    const clearForm = () => {
        setName("");
        setPassword("");
        setConfirmPw("");
        setEmail("");
    }

    return (
        <div className="registerPage">
            <h2 id="noMarginTop">Register New Employee</h2>
            <fieldset>
                <FormGroup className="formGroup">
                    <label className="loginLabel">First and Last Name: </label>
                    <input className="loginInput" onChange={ev => setName(ev.target.value)} />
                </FormGroup>
                <FormGroup className="formGroup">
                    <label className="loginLabel">Email Address: </label>
                    <input className="loginInput" onChange={ev => setEmail(ev.target.value)} />
                </FormGroup>
                <FormGroup className="formGroup">
                    <label className="loginLabel">Password: </label>
                    <input type="password" className="loginInput" onChange={ev => setPassword(ev.target.value)} />
                </FormGroup >
                <FormGroup className="formGroup">
                    <label className="loginLabel">Confirm Password: </label>
                    <input type="password" className="loginInput" onChange={ev => setConfirmPw(ev.target.value)} />
                </FormGroup >
                <div className="regButtonBox">
                    <button className="regBtn" onClick={registerSubmit}>Register</button>
                    <button onClick={() => { history.push("/Login") }}>Back To Login</button>
                </div>
            </fieldset >
        </div >
    )
}