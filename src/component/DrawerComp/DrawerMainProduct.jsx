import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ProductContext } from '../../context/ProductProvider';
import DrawerMain from './DrawerMain';

DrawerMainProduct.propTypes = {

};

function DrawerMainProduct({ component }) {
    const { isDrawer, setIsDrawer } = useContext(ProductContext);

    return (
        <>
            <DrawerMain isDrawer={isDrawer} setIsDrawer={setIsDrawer} component={component} />
        </>
    );
}

export default DrawerMainProduct;