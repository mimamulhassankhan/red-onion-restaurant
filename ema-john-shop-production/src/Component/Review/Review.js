import React from 'react';
import { Button, Table } from 'react-bootstrap';
import ReviewItems from '../ReviewItems/ReviewItems';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Review = ({cartForReview}) => {

    return (
        <div className="d-flex">
            {
                cartForReview.length === 0 ?
                <Redirect to={`/`} />
                :

                <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>product Details</th>
                            <th>Actions</th>
                            <th>Quantity</th>
                            <th>Total Price</th>     
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartForReview && cartForReview.map(pd => <ReviewItems clickHandler={() => console.log('Delete Clicked')} key={pd._id} product={pd}></ReviewItems>)
                        }
                        <tr>
                            <td className="bg-danger text-right" colSpan="4"><strong>Total : </strong></td>
                            <td className="bg-danger"></td>
                        </tr>
                    </tbody>
                    </Table>
                    {
                        cartForReview.length > 0 ? 
                        <Link to={`/shipment`} className="btn btn-info float-right">Checkout</Link>
                        :
                        <Button variant="danger" className="float-right" disabled>Please Add Some Product For Review</Button>
                    }
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return{
        cartForReview : state.cart
    }
}

export default connect(mapStateToProps)(Review);