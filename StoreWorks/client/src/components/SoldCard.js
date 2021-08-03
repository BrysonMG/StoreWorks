import React, { useState, useEffect } from 'react';
import { getProductById } from '../modules/productManager';

export const SoldCard = ({ sale }) => {
    const [product, setProduct] = useState({ productName: "" })

    const getProduct = () => {
        getProductById(sale.productId)
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
            <td>{sale.saleQuantity}</td>
            <td>{sale.saleTotal.toFixed(2)}</td>
        </tr>
    )
}