import { getToken } from "./authManager";

const apiUrl = '/api/categories';

export const getAllCategories = () => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));
}

export const getCategoryById = id => {
    return getToken().then(token =>
        fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));
}