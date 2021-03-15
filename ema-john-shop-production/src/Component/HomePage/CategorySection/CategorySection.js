import React from 'react';
import { Card, Container } from 'react-bootstrap';
import Slider from 'react-slick';
import './CategorySection.css';

const settings = {
    focusOnSelect: true,
    className: "center",
    centerMode: false,
    centerPadding: "80px",
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
};

const CategorySection = ({categories, setSelectedCategory}) => {
    return (
        <Container>
            <div>
                <Slider {...settings}>
                    {
                        categories.map(cat => (
                            <Card key={cat._id} style={{cursor: 'pointer'}} onClick={() => setSelectedCategory(cat.categoryName)} className="rounded overflow-hidden">
                                <Card.Img style={{minHeight: '200px', maxHeight: '200px'}} src={cat.productImage || cat.categorytImage || 'https://via.placeholder.com/150/000000/FFFFFF'} alt="Card image" />
                                <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                    <Card.Title className="text-light shadow font-weight-bold display-4">{cat.categoryName}</Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        ))
                    }
                </Slider>
            </div>
        </Container>
    );
};

export default CategorySection;