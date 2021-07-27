import { getToken } from "./authManager";

const apiUrl = '/api/shrink';

export const getAllShrink = () => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));
}

export const addShrink = shrink => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(shrink)
        }).then(res => res.json()));
}