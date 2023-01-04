import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import DrawerMain from './DrawerMain';
import { CategoryContext } from '../../context/CategoryProvider';

DrawerMainCategory.propTypes = {

};

function DrawerMainCategory({ component }) {
    const { isDrawer, setIsDrawer } = useContext(CategoryContext);

    return (
        <>
            <DrawerMain isDrawer={isDrawer} setIsDrawer={setIsDrawer} component={component} />
        </>
    );
}

export default DrawerMainCategory;