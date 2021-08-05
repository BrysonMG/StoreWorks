import React, { useState, useEffect } from 'react';
import { getAllEmployees } from '../modules/employeeManager';
import { EmployeeCard } from './EmployeeCard';
import Draggable from 'react-draggable';
import '../styles/tables.css';
import '../styles/employeeManage.css';

export const EmployeeMgmt = () => {
    const [employees, setEmployees] = useState([]);

    const checkIfMobileUser = agent => {
        if (agent.includes('mobi')) {
            return true
        }
        return false
    }

    let userAgent = navigator.userAgent.toLowerCase(),
        userIsOnMobile = checkIfMobileUser(userAgent);

    const getEmployees = () => {
        getAllEmployees().then(allEmployees => {
            setEmployees(allEmployees);
        })
    }

    useEffect(() => {
        getEmployees();
    }, [])

    return (
        <Draggable disabled={userIsOnMobile}>
            <div className="employeeMgmt">
                <table className="employeeList">
                    <thead>
                        <tr className="tableSubLabel">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Manager Access</th>
                            <th>Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => {
                            return <EmployeeCard key={employee.id} employee={employee} getEmployees={getEmployees} />
                        })}
                    </tbody>
                </table>
            </div>
        </Draggable>
    )
}