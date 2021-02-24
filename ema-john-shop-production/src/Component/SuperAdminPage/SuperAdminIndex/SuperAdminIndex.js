import React from 'react';
import { connect } from 'react-redux';
import CommonDashBoard from '../../Shared/CommonDashBoard/CommonDashBoard';

const SuperAdminIndex = ({user}) => {
    return (
        <>
        {
            user.role === 'admin'?
            <CommonDashBoard></CommonDashBoard>
            :
            <h1 className="text-center text-danger">This page is not accessible through your account. Try sign out!</h1>
        }
            
        </>
    );
};

const mapStateToProps = state => {
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(SuperAdminIndex);