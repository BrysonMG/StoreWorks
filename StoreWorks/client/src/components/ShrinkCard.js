import React, { useState, useEffect } from 'react';
import { getProductById } from '../modules/productManager';

export const ShrinkCard = ({ shrink }) => {
    const [product, setProduct] = useState({ productName: "" })

    const getProduct = () => {
        getProductById(shrink.productId)
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
            <td>{shrink.shrinkQuantity}</td>
            <td>{shrink.shrinkTotal.toFixed(2)}</td>
        </tr>
    )
}