import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct = () => {
        fetch('https://fathomless-basin-42766.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    return (
        <div>
            <h3>Add Products</h3>
            <form action="" method="post">
                <label htmlFor="pdname">Product Name</label>
                <input name="pdname" type="text" placeholder="Product Name"/>
                <br/>
                <label htmlFor="des">Description</label>
                <input name="des" type="text"/>
                <br/>
                <label htmlFor="price">Price</label>
                <input name="price" type="text"/>
                <br/>
                <label htmlFor="file">Product Image</label>
                <input name="file" type="file"/>
                <br/>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;