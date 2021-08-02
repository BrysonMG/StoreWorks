import { getToken } from "./authManager";

const apiUrl = '/api/employees';

export const getAllEmployees = () => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));
}

export const getEmployee = firebaseId => {
    return getToken().then(token =>
        fetch(`${apiUrl}/${firebaseId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));
}

export const getEmployeeByEmail = email => {
    return getToken().then(token =>
        fetch(`${apiUrl}/email/${email}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));
}

export const addEmployee = employee => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(employee)
        }).then(res => res.json()));
}

export const editEmployee = employee => {
    return getToken().then(token =>
        fetch(`${apiUrl}/${employee.Id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(employee)
        }));
}

export const deleteEmployee = id => {
    return getToken().then(token =>
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }));
}