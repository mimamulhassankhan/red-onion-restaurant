import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const CategorySection = ({categories, setSelectedCategory}) => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        setCategory(categories.slice(0, 3));
    },[categories]);

    return (
        <Container className="my-3">
            <Row>
                {
                    category.map(cat => 
                    <Col key={cat._id}>
                        <Card style={{height: '250px', cursor: 'pointer'}} onClick={() => setSelectedCategory(cat.categoryName)} className="bg-dark m-3 text-white shadow">
                            <Card.ImgOverlay className="h-100 d-flex flex-column justify-content-end">
                                <Card.Title className="card-text">{cat.categoryName}</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>)
                }
                
            </Row>
        </Container>
    );
};

export default CategorySection;