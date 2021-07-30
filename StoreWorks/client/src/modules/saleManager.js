import { getToken } from "./authManager";

const apiUrl = '/api/sales';

export const getAllSales = () => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));
}

export const addSale = sale => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(sale)
        }).then(res => res.json()));
}