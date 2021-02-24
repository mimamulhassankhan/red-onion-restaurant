import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addCategory } from '../../../Redux/Actions/StoreActions';
import CategorySection from '../CategorySection/CategorySection';
import ProductContainer from '../ProductContainer/ProductContainer';
import SelectionTab from '../SelectionTab/SelectionTab';

const HomePageIndex = ({categories}) => {
    const [selectedCategory, setSelectedCategory] = useState('trending-items');

    return (
        <>
            <CategorySection categories={categories} setSelectedCategory={setSelectedCategory}></CategorySection>
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