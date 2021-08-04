import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addProduct } from '../modules/productManager';
import { getAllCategories } from '../modules/categoryManager';
import '../styles/productManage.css';

export const AddProductForm = () => {
    const [productName, setProductName] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({ id: 0, categoryName: "" })
    const [cost, setCost] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const history = useHistory();

    const getCategories = () => {
        getAllCategories().then(allCategories => {
            setCategories(allCategories);
        })
    }

    const handleCategory = event => {
        let category = event.target.value;
        let categoryArray = category.split("--")

        let catId = parseInt(categoryArray[1]);
        let catName = categoryArray[0];

        const categoryObj = {
            id: catId,
            categoryName: catName
        }
        setSelectedCategory(categoryObj);
    }

    const handleName = event => {
        let name = event.target.value;
        setProductName(name);
    }

    const handleCost = event => {
        let theCost = event.target.value;
        setCost(theCost);
    }

    const handleSell = event => {
        let price = event.target.value;
        setSellPrice(price);
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (selectedCategory.id === 0) {
            alert("Please Select A Category.");
            return;
        }
        const productObj = {
            CategoryId: selectedCategory.id,
            ProductName: productName,
            Quantity: 0,
            Cost: parseFloat(cost).toFixed(2),
            SellPrice: parseFloat(sellPrice).toFixed(2)
        }
        alert("Product Successfully Added!\n\nQuantity Initialized to 0. Please use 'Receiving' to increase your quantity.");
        clearForm();
        addProduct(productObj);
    }

    const clearForm = () => {
        setProductName("");
        setCost("");
        setSellPrice("");
    }


    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className="addProductForm">
            <h3>Add A Product</h3>

            <label>Product Name: </label>
            <input onChange={handleName} value={productName} />
            <br />
            <label>Category: </label>
            <select onChange={handleCategory}>
                <option selected hidden disabled>Please Choose A Category</option>
                {categories.map(category => {
                    return <option key={category.id} value={category.categoryName + "--" + category.id} hidden={category.categoryName === "Deleted"} disabled={category.categoryName === "Deleted"}>{category.categoryName}</option>
                })}
            </select>
            <br />
            <label>Cost: </label>
            <input onChange={handleCost} placeholder="0.00" value={cost} />
            <br />
            <label>Selling Price: </label>
            <input onChange={handleSell} placeholder="0.00" value={sellPrice} />
            <br /><br />
            <button className="regBtn" onClick={handleSubmit}>Add Product</button>
            <button onClick={() => { history.push("/ProductMgmt") }}>Exit</button>
        </div>
    )
}