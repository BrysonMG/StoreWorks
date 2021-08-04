import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getAllProducts } from '../modules/productManager';
import { ProductCard } from './ProductCard';
import '../styles/tables.css';
import '../styles/productManage.css';

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
        <div className="mgmtPage">
            <button onClick={goToAddForm} id="addProdBtn">Add New Product</button>
            <div className="sizingBox">
                <table className="productList">
                    <thead>
                        <tr className="tableSubLabel">
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
                            return <ProductCard key={product.id} product={product} getProducts={getProducts} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}