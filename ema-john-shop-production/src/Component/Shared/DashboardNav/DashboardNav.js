import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const DashboardNav = ({displayOption, user}) => {
    return (
        <div>
            <Row className="justify-content-between py-3 bg-light">
                <Col md={6}>
                    <h4 className="px-2 float-left">{displayOption}</h4>
                </Col>
                <Col md={6}>
                    <h4 className="text-right px-5">{user.displayName}</h4>
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(DashboardNav);