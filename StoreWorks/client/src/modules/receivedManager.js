import { getToken } from "./authManager";

const apiUrl = '/api/received';

export const getAllReceived = () => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));
}

export const addReceived = received => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(received)
        }).then(res => res.json()));
}