import React, { useState, useEffect } from 'react';
import { getProductById } from '../modules/productManager';

export const ReceivedCard = ({ received }) => {
    const [product, setProduct] = useState({ productName: "" })

    const getProduct = () => {
        getProductById(received.productId)
            .then(theProduct => {
                setProduct(theProduct);
            })
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <tr>
            <td>{product.productName}</td>
            <td>{received.receivedQuantity}</td>
            <td>{received.receivedTotal.toFixed(2)}</td>
        </tr>
    )
}