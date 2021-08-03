import { getToken } from "./authManager";

const apiUrl = '/api/products';

export const getAllProducts = () => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));

}

export const getProductById = id => {
    return getToken().then(token =>
        fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()));
}

export const addProduct = product => {
    return getToken().then(token =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(product)
        }).then(res => res.json()));
}

export const editProduct = (product) => {
    return getToken().then(token => {
        if (product.Id === undefined) {
            fetch(`${apiUrl}/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(product)
            })
        } else {
            fetch(`${apiUrl}/${product.Id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(product)
            })
        }
    });
}

export const deleteProduct = (id) => {
    return getToken().then(token =>
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }));
}