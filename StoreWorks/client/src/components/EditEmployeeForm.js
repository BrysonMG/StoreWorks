import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getAllEmployees, editEmployee } from "../modules/employeeManager";
import { FormGroup } from "reactstrap";

export const EditEmployeeForm = () => {
    const [theEmployee, setTheEmployee] = useState({})
    const [name, setName] = useState("");
    const [canManage, setCanManage] = useState(false);
    const { employeeId } = useParams();
    const history = useHistory();

    const getEmployee = () => {
        getAllEmployees().then(allEmployees => {
            const thisEmployee = allEmployees.find(employee => parseInt(employee.id) == parseInt(employeeId))

            setTheEmployee(thisEmployee);
            setName(thisEmployee.employeeName);
            setCanManage(thisEmployee.canManage);
        })
    }

    const submitChanges = event => {
        event.preventDefault();
        const employeeObj = {
            Id: parseInt(employeeId),
            FirebaseUserId: theEmployee.firebaseUserId,
            EmployeeName: name,
            Email: theEmployee.email,
            CanManage: canManage
        }
        editEmployee(employeeObj).then(() => {
            alert("Employee Successfully Updated");
            history.push("/EmployeeMgmt");
        })
    }

    useEffect(() => {
        getEmployee();
    }, [])

    return (
        <fieldset>
            <FormGroup>
                <label>Name: </label>
                <input value={name} onChange={ev => setName(ev.target.value)} />
            </FormGroup>
            <FormGroup>
                <label>Manager Access: </label>
                <input type="checkbox" checked={canManage} onChange={() => { setCanManage(!canManage) }} />
            </FormGroup>
            <FormGroup>
                <button onClick={submitChanges}>Save Changes</button>
                <button onClick={() => { history.push("/EmployeeMgmt") }}>Exit</button>
            </FormGroup>
        </fieldset>
    )
}