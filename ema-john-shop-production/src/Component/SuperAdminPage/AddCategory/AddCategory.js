import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { addCategory } from '../../../Redux/Actions/StoreActions';

const AddCategory = ({categories, addCategory}) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = data => {
        const categoryData = new FormData();
        categoryData.append('categoryName', data.categoryName);
        categoryData.append('categoryDetails', data.categoryDetails);
        categoryData.append('categoryImage', data.categoryImage[0]);
        fetch('http://localhost:5000/addCategory', {
            method: 'POST',
            body: categoryData
        })
        .then(res => res.json())
        .then(data => {
            addCategory([data, ...categories]);
            reset({});
        }); 
    }

    return (
        <>
           <form className="p-5 bg-white rounded m-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
                <div className="col-6">
                    <div className="form-group">
                        <input type="text" ref={register({ required: true })} name="categoryName" placeholder="Category Name" className="form-control"/>
                        {errors.categoryName && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <textarea rows={3} ref={register({ required: true })} name="categoryDetails" placeholder="Category Details" className="form-control"/>
                        {errors.categoryDetails && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="categoryImage">Category Image</label>
                    <input name="categoryImage" ref={register({ required: true })} className="form-control bg-transparent" placeholder="Upload Image" type="file" />
                    {errors.categoryImage && <span className="text-danger">This field is required</span>}
                </div>
            </div>
            <div className="form-group text-right">
                <button type="submit" className="btn btn-dark px-5">Send</button>
            </div>
        </form> 
        </>
    );
};

const mapStateToProps = state => {
    return{
        categories: state.categories
    }
}

const mapDispatchToProps = {
    addCategory : addCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);