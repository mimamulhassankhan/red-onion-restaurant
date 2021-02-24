import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { setAllUser } from '../../../Redux/Actions/StoreActions';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';
import { createUserWithEmailAndPassword } from '../../Shared/SignUp/SignUpManager';

const AddSeller = ({allUsers, setAllUser}) => {
    const { register, handleSubmit, errors, reset } = useForm();
    
    const createUserToDb = data => {
        const sellerDetails = {...data, role: 'seller' }
        fetch('http://localhost:5000/writeSingleUser',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(sellerDetails)
        })
        .then(res => res.json())
        .then(data => {
            setAllUser([data, ...allUsers]);
        })
        .catch(err => console.log(err));
    }

    const onSubmit = data => {
        const {sellerName, email, sellerPassword} = data;
        if(sellerName && email && sellerPassword){
            createUserWithEmailAndPassword(sellerName, email, sellerPassword)
            .then(res => {
                if(res){
                    createUserToDb(data);
                    reset({});
                }
            })
            .catch(err => console.log(err));
        }
    }
    
    return (
        <>
        <DashboardNav displayOption="Add Seller"></DashboardNav>
        <form className="p-5 bg-white rounded m-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
                <div className="col-6">
                    <div className="form-group">
                        <input type="text" ref={register({ required: true })} name="sellerName" placeholder="Seller Name" className="form-control"/>
                        {errors.sellerName && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <textarea rows={3} ref={register({ required: true })} name="sellerAddress" placeholder="Seller Address" className="form-control"/>
                        {errors.sellerAddress && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="text" ref={register({ required: true })} name="email" placeholder="Seller User Name" className="form-control"/>
                        {errors.email && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" ref={register({ required: true, pattern: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/ })} name="sellerPassword" placeholder="Seller Password" className="form-control"/>
                        {errors.sellerPassword && errors.sellerPassword.type === "required" &&  <span className="text-danger">This field is required</span>}
                        {errors.sellerPassword && errors.sellerPassword.type === "pattern" &&  <span className="text-danger">Password have one uppercase, one lower case , one special character, 8 character</span>}
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="sellerLogo">Seller Logo</label>
                    <input name="sellerLogo" className="form-control bg-transparent" placeholder="Upload Logo" type="file" />
                    {errors.sellerLogo && <span className="text-danger">This field is required</span>}
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
        allUsers: state.allUsers
    }
}

const mapDispatchToProps = {
    setAllUser: setAllUser
}
export default connect(mapStateToProps, mapDispatchToProps)(AddSeller);