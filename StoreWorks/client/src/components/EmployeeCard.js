import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteEmployee } from '../modules/employeeManager';
import firebase from 'firebase';
import '../styles/tables.css';

export const EmployeeCard = ({ employee, getEmployees }) => {
    const history = useHistory();

    const deleteThisEmployee = theEmployee => {
        if (window.confirm(`Are you sure you wish to delete "${theEmployee.employeeName}"? All of their information will be lost.`)) {
            deleteEmployee(theEmployee.id)
                .then(() => {
                    getEmployees();
                })
        }
    }

    const currentUserEmail = firebase.auth().currentUser.email;

    if (employee.email === "Former Employee" || employee.email === currentUserEmail) {
        return null;
    } else {
        return (
            <tr className="tableRow">
                <td>{employee.employeeName}</td>
                <td>{employee.email}</td>
                <td>{employee.canManage ? "Yes" : "No"}</td>
                <td className="tableButtons"><button onClick={() => { history.push(`/EditEmployee/${employee.id}`) }}>Edit</button><button onClick={() => { deleteThisEmployee(employee) }}>Delete</button></td>
            </tr>
        )
    }
}