import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getAllProducts } from '../modules/productManager';
import { ProductCard } from './ProductCard';
import '../styles/tables.css';

export const ProductMgmt = () => {
    const [products, setProducts] = useState([])
    const history = useHistory();

    const getProducts = () => {
        getAllProducts().then(allProducts => {
            const activeProducts = allProducts.slice(1, allProducts.length);
            setProducts(activeProducts);
        })
    }

    const goToAddForm = () => {
        history.push("/AddProduct")
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <button onClick={goToAddForm}>Add New Product</button>
            <table className="productList">
                <thead>
                    <tr className="tableHeader">
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Sell Price</th>
                        <th>Profit</th>
                        <th>Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return <ProductCard key={product.id} product={product} />
                    })}
                </tbody>
            </table>
        </>
    )
}