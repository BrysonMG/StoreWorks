import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteProduct } from '../modules/productManager';
import '../styles/tables.css';

export const ProductCard = ({ product, getProducts }) => {
    const history = useHistory();

    const deleteThisProduct = theProduct => {
        if (window.confirm(`Are you sure you wish to delete "${theProduct.productName}"? All of its information will be lost.`)) {
            deleteProduct(theProduct.id).then(() => {
                getProducts();
            })
        }
    }

    return (
        <tr className="tableRow">
            <td className="productData">{product.productName}</td>
            <td className="productData">{product.quantity}</td>
            <td className="productData">{product.cost.toFixed(2)}</td>
            <td className="productData">{product.sellPrice.toFixed(2)}</td>
            <td className="productData">{(product.sellPrice - product.cost).toFixed(2)}</td>
            <td className="tableButtons">
                <div className="tableBtnBox">
                    <button onClick={() => { history.push(`/EditProduct/${product.id}`) }}>Edit</button>
                    <button onClick={() => { deleteThisProduct(product) }}>Delete</button>
                </div>
            </td>
        </tr >
    )
}