import React, { useState, useEffect } from 'react';
import { getAllEmployees } from '../modules/employeeManager';
import { EmployeeCard } from './EmployeeCard';
import '../styles/tables.css';
import '../styles/employeeManage.css';

export const EmployeeMgmt = () => {
    const [employees, setEmployees] = useState([]);

    const getEmployees = () => {
        getAllEmployees().then(allEmployees => {
            setEmployees(allEmployees);
        })
    }

    useEffect(() => {
        getEmployees();
    }, [])

    return (
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
    )
}