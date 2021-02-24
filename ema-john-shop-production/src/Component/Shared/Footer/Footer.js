import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="d-flex align-items-center bg-gray py-5">
            <Container>
                <Row>
                    <Col lg={2} sm={4} className="my-auto">
                        <Image style={{width: '50%'}} src="/images/logo.png" alt="logo" fluid/> 
                        <p>&copy; {new Date().getFullYear()} Flone.</p>
                        <p>All right reserved.</p>
                    </Col>
                    <Col lg={2} sm={4}>
                        <ul >
                            <p><strong>ABOUT US</strong></p>
                            <li>
                                <Link to={`/#`}>About us</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Store location</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Contact</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Orders tracking</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={2} sm={6}>
                        <ul >
                            <p><strong>ABOUT US</strong></p>
                            <li className="text-decoration-none">
                                <Link to={`/#`}>About us</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Store location</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Contact</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Orders tracking</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={2} sm={6}>
                        <ul >
                            <p><strong>ABOUT US</strong></p>
                            <li className="text-decoration-none">
                                <Link to={`/#`}>About us</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Store location</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Contact</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Orders tracking</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={2} sm={6}>
                        <ul >
                            <p><strong>ABOUT US</strong></p>
                            <li className="text-decoration-none">
                                <Link to={`/#`}>About us</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Store location</Link>
                            </li>
                            <li>
                                <Link to={`/#`}>Register as Seller</Link>
                            </li>
                            <li>
                                <Link to={`/superAdmin`}>Super Admin</Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;