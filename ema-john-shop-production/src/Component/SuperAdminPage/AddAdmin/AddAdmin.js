import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { setAllUser } from '../../../Redux/Actions/StoreActions';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';
import { createUserWithEmailAndPassword } from '../../Shared/SignUp/SignUpManager';

const AddAdmin = ({allUsers, setAllUser}) => {
    const { register, handleSubmit, errors, reset } = useForm();

    const createUserToDb = data => {
        const adminDetails = {...data, role: 'admin' }
        fetch('http://localhost:5000/writeSingleUser',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(adminDetails)
        })
        .then(res => res.json())
        .then(data => {
            setAllUser([data, ...allUsers]);
        })
        .catch(err => console.log(err));
    }

    const onSubmit = data => {
        const {adminName, email, adminPassword} = data;
        if(adminName && email && adminPassword){
            createUserWithEmailAndPassword(adminName , email, adminPassword)
            .then(res => {
                if(res){
                    createUserToDb(data);
                    reset({});
                }
            })
        }
    }
    return (
        <>
        <DashboardNav displayOption="Add Admin"></DashboardNav>
        <form className="p-5 bg-white rounded m-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
                <div className="col-6">
                    <div className="form-group">
                        <input type="text" ref={register({ required: true })} name="adminName" placeholder="Admin Name" className="form-control"/>
                        {errors.adminName && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="email" ref={register({ required: true })} name="email" placeholder="Admin Email" className="form-control"/>
                        {errors.email && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <input type="password" ref={register({ required: true, pattern: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/ })} name="adminPassword" placeholder="Admin Password" className="form-control"/>
                        {errors.adminPassword && errors.adminPassword.type === "required" &&  <span className="text-danger">This field is required</span>}
                        {errors.adminPassword && errors.adminPassword.type === "pattern" &&  <span className="text-danger">Password have one uppercase, one lower case , one special character, 8 character</span>}
                    </div>
                </div>
            </div>
            <div className="form-group text-right">
                <button type="submit" className="btn btn-dark px-5">Send</button>
            </div>
        </form>
        </> 
    );
};

const mapStateToProps = (state) => {
    return{
        allUsers: state.allUsers
    }
}

const mapDispatchToProps = {
    setAllUser: setAllUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAdmin);