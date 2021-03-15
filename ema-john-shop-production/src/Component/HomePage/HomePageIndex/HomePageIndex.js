import React, { useState } from 'react';
import { connect } from 'react-redux';
import CategorySection from '../CategorySection/CategorySection';
import ProductContainer from '../ProductContainer/ProductContainer';
import SelectionTab from '../SelectionTab/SelectionTab';

const HomePageIndex = ({categories}) => {
    const [selectedCategory, setSelectedCategory] = useState('trending-items');

    return (
        <>
        <div className="my-5">
            <CategorySection categories={categories} setSelectedCategory={setSelectedCategory}></CategorySection>
        </div>
        <SelectionTab selectedCategory={selectedCategory}></SelectionTab>
        <ProductContainer selectedCategory={selectedCategory}></ProductContainer>
        </>
    );
};

const mapStateToProps = state => {
    return{
        categories: state.categories
    }
}

export default connect(mapStateToProps)(HomePageIndex);