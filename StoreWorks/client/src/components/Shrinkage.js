import React, { useState, useEffect, useRef } from "react";
import { getAllProducts, editProduct } from "../modules/productManager";
import firebase from "firebase";
import { getEmployeeByEmail } from "../modules/employeeManager";
import { addShrink } from "../modules/shrinkManager";
import '../styles/saleRecShrink.css';

export const Shrinkage = () => {
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
    const [selectedProduct, setSelectedProduct] = useState({ productName: "", quantity: 0, cost: 0.00 })
    const [quantity, setQuantity] = useState("");
    const [costPer, setCostPer] = useState("");

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setShow(false);
        }
    }

    const updateProductSearch = searchTerm => {
        setSearch(searchTerm);
        setShow(false);
    }

    const getProducts = () => {
        getAllProducts().then(theProducts => {
            setProducts(theProducts)
        })
    }

    const addShrinkToDb = () => {
        const userEmail = firebase.auth().currentUser.email;
        getEmployeeByEmail(userEmail)
            .then(employee => {
                const shrinkObj = {
                    ProductId: selectedProduct.id,
                    EmployeeId: employee.id,
                    ShrinkQuantity: quantity,
                    ShrinkTotal: (quantity * costPer)
                }
                addShrink(shrinkObj).then(() => {
                    reduceProductQuantity();
                    clearForm();
                })
            })
    }

    const clearForm = () => {
        setSelectedProduct({ productName: "", quantity: 0, cost: 0.00 });
        setCostPer("");
        setQuantity("");
        setSearch("")
    }

    const reduceProductQuantity = () => {
        const newQuantityProduct = { ...selectedProduct }
        newQuantityProduct.quantity -= parseInt(quantity);
        editProduct(newQuantityProduct).then(() => {
            getProducts();
        })
    }

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    useEffect(() => {
        getProducts();
    }, [selectedProduct])

    return (
        <div className="formContainer">
            <h3>Shrinkage is for logging damaged, lost, or stolen products.</h3>
            <div className="productSelect">
                <label>Select a Product: </label>
                <input
                    id="saleProductInput"
                    onFocus={() => setShow(!show)}
                    onChange={event => {
                        setShow(true)
                        setSearch(event.target.value);
                    }}
                    className="autoProduct"
                    placeholder="Type to search"
                    value={search}
                />
                {show && (
                    <div ref={wrapperRef} className="listOuterBox">
                        <div className="autoList">
                            {products
                                .slice(1, products.length)
                                .filter(({ productName }) => productName.toLowerCase().indexOf(search.toLowerCase()) > -1)
                                .map((product, i) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setCostPer(product.cost.toFixed(2));
                                                updateProductSearch(product.productName);
                                            }}
                                            className="autoOption"
                                            key={i}
                                            tabIndex="0"
                                        >
                                            <span>{product.productName}</span>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                )}
            </div>

            <div className="quantityBox">
                <label>Quantity: </label>
                <input placeholder="0" value={quantity} onChange={event => {
                    setQuantity(event.target.value);
                }} />
                <span hidden={selectedProduct.productName === ""}> ({selectedProduct.quantity} On Hand)</span>
            </div>
            <div className="pricePerBox">
                <label>Cost Per Unit: </label>
                <input placeholder="0.00" value={costPer} onChange={event => {
                    setCostPer(event.target.value);
                }} />
            </div>
            <br />
            <div className="totalBox">
                <label>Total Loss: </label>
                <span className="noModify">${(quantity * costPer)?.toFixed(2)}</span>
            </div>
            <div className="submitClear">
                <button className="regBtn" onClick={() => {
                    addShrinkToDb()
                    alert("Shrink Logged Successfully!")
                }}>Confirm Shrink</button>
                <button onClick={() => {
                    clearForm()
                }}>Clear</button>
            </div>
        </div>
    )
}