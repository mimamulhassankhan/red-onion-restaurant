import React from 'react';
import { Container } from 'react-bootstrap';
import './SelectionTab.css';

const SelectionTab = ({selectedCategory}) => {
    return (
        <>
        <Container>
            <h2 className="tab-item"> Showing products for : {selectedCategory}</h2>           
        </Container>
        </>
    );
};

export default SelectionTab;