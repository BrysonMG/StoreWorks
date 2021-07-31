import React, { useState } from 'react';
import '../styles/tables.css';

export const ProductCard = ({ product }) => {

    return (
        <tr className="tableRow">
            <td className="productData">{product.productName}</td>
            <td className="productData">{product.quantity}</td>
            <td className="productData">{product.cost.toFixed(2)}</td>
            <td className="productData">{product.sellPrice.toFixed(2)}</td>
            <td className="productData">{(product.sellPrice - product.cost).toFixed(2)}</td>
            <td className="tableButtons"><button>Edit</button> <button>Delete</button></td>
        </tr >
    )
}