import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { addAllProduct } from '../../../Redux/Actions/StoreActions';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';
import ViewAllProducts from '../ViewAllProducts/ViewAllProducts';

const AddProduct = ({sellers, user, categories, products, addAllProduct}) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [sellerInfo, setSellerInfo] = useState({});

    useEffect( () => {
        const [selectedSeller] = sellers.filter(seller => seller.sellerUserName === user.email)
        setSellerInfo(selectedSeller);
    }, [sellers, user]);

    const onSubmit = data => {
        const productData = new FormData();
        productData.append('productSellerId', sellerInfo._id);
        productData.append('productSellerName', sellerInfo.sellerName);
        productData.append('productName', data.productName);
        productData.append('productDescription', data.productDescription);
        productData.append('productCategory', data.productCategory);
        productData.append('productPrice', data.productPrice);
        productData.append('productStock', data.productStock);
        productData.append('productImage', data.productImage[0]);


        fetch('https://fathomless-basin-42766.herokuapp.com/addProduct', {
            method: 'POST',
            body: productData
        })
        .then(res => res.json())
        .then(prodData => {
            if(prodData){
                const addNewProduct = [prodData, ...products];
                addAllProduct(addNewProduct);
                reset();
            }
        })
    }
    return (
        <>
            <DashboardNav displayOption="Add Product"></DashboardNav>
            <form className="p-5 bg-white rounded m-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
                <div className="col-6">
                    <div className="form-group">
                        <input type="text" ref={register({ required: true })} name="productName" placeholder="Product Name" className="form-control"/>
                        {errors.productName && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <textarea rows={3} ref={register({ required: true })} name="productDescription" placeholder="Product Description" className="form-control"/>
                        {errors.productDescription && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <select ref={register({ required: true })} name="productCategory" placeholder="Product Category" className="form-control">
                            {
                                categories && categories.map(cat => <option key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>)
                            }
                        </select>
                        {errors.productCategory && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="number" ref={register({ required: true, min: 1.00 })} name="productPrice" placeholder="Product Price" className="form-control"/>
                        {errors.productPrice && errors.productPrice.type === "required" && <span className="text-danger">This field is required</span>}
                        {errors.productPrice && errors.productPrice.type === "min" && <span className="text-danger">Minimum price</span>}
                    </div>
                    <div className="form-group">
                        <input type="number" ref={register({ required: true, min: 1 })} name="productStock" placeholder="Product Stock" className="form-control"/>
                        {errors.productStock && errors.productStock.type === "required" &&  <span className="text-danger">This field is required</span>}
                        {errors.productStock && errors.productStock.type === "min" &&  <span className="text-danger">Minimum value 1</span>}
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="productImage">Product Image</label>
                    <input name="productImage" ref={register({ required: true })} className="form-control bg-transparent" placeholder="Upload Logo" type="file" />
                    {errors.productImage && <span className="text-danger">This field is required</span>}
                </div>
            </div>
            <div className="form-group text-right">
                <button type="submit" className="btn btn-dark px-5">Send</button>
            </div>
        </form>
        <ViewAllProducts products={products}></ViewAllProducts>
        </>
    );
};

const mapStateToProps = state => {
    return{
        categories: state.categories,
        products: state.products,
        user: state.user,
        sellers: state.sellers
    }
}

const mapDispatchToProps = {
    addAllProduct : addAllProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);