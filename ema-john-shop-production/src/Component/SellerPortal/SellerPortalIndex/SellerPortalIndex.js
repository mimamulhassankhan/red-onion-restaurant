import React from 'react';
import { connect } from 'react-redux';
import CommonDashBoard from '../../Shared/CommonDashBoard/CommonDashBoard';

const SellerPortalIndex = ({user}) => {
    return (
        <>
        {
            user.role === 'seller'?
            <CommonDashBoard></CommonDashBoard>
            :
            <h1 className="text-center text-danger">This page is not accessible through this account. Try sign out</h1>
        }
            
        </>
    );
};

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(SellerPortalIndex);