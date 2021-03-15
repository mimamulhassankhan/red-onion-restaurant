import React, { useState } from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { Link, useHistory } from 'react-router-dom';
import { Button, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addSignedUser } from '../../Redux/Actions/StoreActions';
import { overAllSignOut } from '../Login/loginManager';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const Header = ({user, cart, categories, addSignedUser, products}) => {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const showDropdown = e => {
        setShow(!show);
    }
    
    const hideDropdown = e => {
        setShow(false);
    }

    const handleSignOut = () => {
        overAllSignOut()
        .then(userData => {
            addSignedUser({})
        })
        .catch(err => console.log(err));
    }
    return (
        <div className="header">
            <Image src={logo} alt="logo" fluid/>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to={`/`}>Shop</Nav.Link>
                        <NavDropdown title="Categories" show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                            {
                                categories.map(cat => <NavDropdown.Item key={cat._id} href="#">{cat.categoryName}</NavDropdown.Item>)
                            }
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {
                            user.email ?
                            <>
                            <Nav.Link>{user.displayName}</Nav.Link>
                            <Nav.Link as={Link} to={`/review`}>{cart.length > 0 ? `Review Cart (${cart.length})` : `Review Cart`}</Nav.Link>
                            <Nav.Link as={Button} variant="danger" onClick={() => handleSignOut()}>Sign Out</Nav.Link>
                            </>
                            :
                            <>
                            <Autocomplete
                                style={{ width: 300 }}
                                options={products}
                                getOptionLabel={(option) => option?.productName || option?.name || option?.ProductName}
                                renderInput={(params) => (
                                    <TextField {...params} label="Search products" variant="filled" />
                                )}
                                renderOption={(option, { inputValue }) => {
                                    const matches = match(option?.productName || option.name || option?.ProductName, inputValue);
                                    const parts = parse(option?.productName || option.name || option?.ProductName, matches);
                                    return (
                                    <div onClick={() => history.push(`/product/${option?._id || option?.productId}`)}>
                                        {parts.map((part, index) => (
                                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                            {part.text}
                                        </span>
                                        ))}
                                    </div>
                                    );
                                }}
                            />
                            <Nav.Link as={Link} to={`/review`}>{cart.length > 0 ? `Review Cart (${cart.length})` : `Review Cart`}</Nav.Link>
                            <Nav.Link as={Link} className="btn btn-danger" to={`/myAccount`}>My Account</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        products: state.products,
        user: state.user,
        cart: state.cart,
        categories: state.categories
    }
}

const mapDispatchToProps ={
    addSignedUser : addSignedUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);