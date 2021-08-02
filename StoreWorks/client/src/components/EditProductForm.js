import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getProductById, editProduct } from '../modules/productManager';
import { getCategoryById, getAllCategories } from '../modules/categoryManager';


export const EditProductForm = () => {
    const [quantity, setQuantity] = useState(0);
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({ id: 0, categoryName: "" })
    const [cost, setCost] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const { productId } = useParams();
    const history = useHistory();

    const getProduct = () => {
        getProductById(productId).then(theProduct => {
            setQuantity(theProduct.quantity);
            setName(theProduct.productName);
            getCategoryById(theProduct.categoryId)
                .then(category => {
                    setSelectedCategory(category);
                });
            setCost(theProduct.cost);
            setSellPrice(theProduct.sellPrice)
        })
    }

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
        setName(name);
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
        const productObj = {
            Id: parseInt(productId),
            CategoryId: selectedCategory.id,
            ProductName: name,
            Quantity: quantity,
            Cost: parseFloat(cost).toFixed(2),
            SellPrice: parseFloat(sellPrice).toFixed(2)
        }
        clearForm();
        editProduct(productObj);
        alert("Product Successfully Updated!");
        history.push("/ProductMgmt");
    }

    const clearForm = () => {
        setName("");
        setCost("");
        setSellPrice("");
    }


    useEffect(() => {
        getCategories();
        getProduct();
    }, [])

    return (
        <div className="editProductForm">
            <h3>Edit A Product</h3>

            <label>Product Name</label>
            <input onChange={handleName} value={name} />
            <br />
            <label>Category</label>
            <select onChange={handleCategory}>
                <option selected hidden disabled>Please Choose A Category</option>
                {categories.map(category => {
                    return <option key={category.id} value={category.categoryName + "--" + category.id} hidden={category.categoryName === "Deleted"} disabled={category.categoryName === "Deleted"}>{category.categoryName}</option>
                })}
            </select>
            <br />
            <label>Cost</label>
            <input onChange={handleCost} placeholder="0.00" value={cost} />
            <br />
            <label>Selling Price</label>
            <input onChange={handleSell} placeholder="0.00" value={sellPrice} />
            <br /><br />
            <button onClick={handleSubmit}>Save Changes</button>
            <button onClick={() => { history.push("/ProductMgmt") }}>Exit</button>
        </div>
    )
}