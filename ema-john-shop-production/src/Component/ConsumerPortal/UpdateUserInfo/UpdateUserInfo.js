import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { addSignedUser } from '../../../Redux/Actions/StoreActions';
import { updateJSONData } from '../../../utils/dataControllers';
import DashboardNav from '../../Shared/DashboardNav/DashboardNav';

const UpdateUserInfo = ({user, addSignedUser}) => {
    const {register, handleSubmit, errors, reset} = useForm();
    const handleUpdateUserInfoClick = (data) => {
        const newUserInfo = {
            district: data.district,
            roadNo: data.roadNo,
            flatNo: data.flatNo,
            businessName: data.businessName,
            userPhone: data.userPhone
        }
        updateJSONData(`http://localhost:5000/updateUser/${user?._id}`, newUserInfo)
        .then(data => {
            if(data){
                const updatedUser = {...user, userShippingAddress: newUserInfo};
                addSignedUser(updatedUser);
                reset({});
            }
        })
        .catch(err => console.log(err));
    }
    return (
        <>
        <DashboardNav displayOption="Update Your Info"></DashboardNav>
        <form className="form-group" onSubmit={handleSubmit(handleUpdateUserInfoClick)} placeholder="Enter name">
            <div className="d-flex justify-content-around align-items-center">
                <div>
                    <input style={{ width:'300px'}} className="form-control" name="name" defaultValue={`${user.firstName} ${user.lastName}`} ref={register({ required: true })} placeholder="Enter Name" readOnly/>
                    {errors.name && <span>Name is required</span>}

                    <br/>
                    <input style={{ width:'300px'}} className="form-control" name="email" defaultValue={user.email || ''} ref={register({ required: true })}  placeholder="Enter email" readOnly/>
                    {errors.email && <span className="text-danger">Email is required</span>}

                    <br/>
                    <input style={{ width:'300px'}} className="form-control" name="district" ref={register({ required: true })} defaultValue={user?.userShippingAddress?.district} placeholder="District"/>
                    {errors.district && <span className="text-danger">This field is required</span>}
                    <br/>
                </div>
                <div>
                    <input style={{ width:'300px'}} className="form-control" name="roadNo" ref={register({ required: true })} defaultValue={user?.userShippingAddress?.roadNo} placeholder="Road No"/>
                    {errors.roadNo && <span className="text-danger">Road No is required</span>}
                    
                    <br/>
                    <input style={{ width:'300px'}} className="form-control" name="flatNo" ref={register({ required: true })} defaultValue={user?.userShippingAddress?.flatNo} placeholder="Flat No"/>
                    {errors.flatNo && <span className="text-danger">Flat No is required</span>}

                    <br/>
                    <input style={{ width:'300px'}} className="form-control" name="businessName" ref={register()} defaultValue={user?.userShippingAddress?.businessName} placeholder="Business Name"/>

                    <br/>
                    <input style={{ width:'300px'}} className="form-control" name="userPhone" ref={register({ required: true })} defaultValue={user?.userShippingAddress?.userPhone} placeholder="Enter phone"/>
                    {errors.userPhone && <span className="text-danger">Phone is required</span>}
                    
                    <br/>
                </div>
            </div>
            <input style={{ width:'300px'}} className="btn btn-danger float-right rounded-pill" type="submit" value="Update"/>
        </form>
        </>
    );
};

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = {
    addSignedUser : addSignedUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfo);