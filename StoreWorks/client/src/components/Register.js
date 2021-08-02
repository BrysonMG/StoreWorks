import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";
import { FormGroup } from "reactstrap";

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
        <div>
            <h2>Register New Employee</h2>
            <fieldset>
                <FormGroup>
                    <label>First and Last Name: </label>
                    <input onChange={ev => setName(ev.target.value)} />
                </FormGroup>
                <FormGroup>
                    <label>Email Address: </label>
                    <input onChange={ev => setEmail(ev.target.value)} />
                </FormGroup>
                <FormGroup>
                    <label>Password: </label>
                    <input onChange={ev => setPassword(ev.target.value)} />
                </FormGroup >
                <FormGroup>
                    <label>Confirm Password: </label>
                    <input onChange={ev => setConfirmPw(ev.target.value)} />
                </FormGroup >
                <button onClick={registerSubmit}>Register</button>
                <button onClick={() => { history.push("/Login") }}>Back To Login</button>
            </fieldset >
        </div >
    )
}