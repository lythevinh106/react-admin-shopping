import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TableItem from '../TableItem/TableItem';
import { CategoryContext } from '../../../context/CategoryProvider';

CategoryTableItem.propTypes = {

};

function CategoryTableItem({ item, count, cols }) {

    const { deleteCategory, updateCategory } = useContext(CategoryContext);
    const handledDeleteCategory = (id) => {

        deleteCategory(id)
    }

    const handledUpdateCategory = (id) => {
        updateCategory(id);

    }


    return (
        <>
            <TableItem item={item} count={count} cols={cols} SettingClick={handledUpdateCategory} RemoveClick={handledDeleteCategory} />
        </>
    );
}

export default CategoryTableItem;