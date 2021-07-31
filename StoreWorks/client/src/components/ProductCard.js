import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/tables.css';

export const ProductCard = ({ product }) => {
    const history = useHistory();

    return (
        <tr className="tableRow">
            <td className="productData">{product.productName}</td>
            <td className="productData">{product.quantity}</td>
            <td className="productData">{product.cost.toFixed(2)}</td>
            <td className="productData">{product.sellPrice.toFixed(2)}</td>
            <td className="productData">{(product.sellPrice - product.cost).toFixed(2)}</td>
            <td className="tableButtons"><button onClick={() => { history.push(`/EditProduct/${product.id}`) }}>Edit</button> <button>Delete</button></td>
        </tr >
    )
}