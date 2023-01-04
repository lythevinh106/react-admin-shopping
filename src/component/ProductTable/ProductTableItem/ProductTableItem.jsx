import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ProductContext } from '../../../context/ProductProvider';
import TableItem from '../TableItem/TableItem';

ProductTableItem.propTypes = {

};

function ProductTableItem({ item, count, cols }) {

    const { deleteProduct, updateProduct } = useContext(ProductContext);
    const handledDeleteProduct = (id) => {
        deleteProduct(id)
    }

    const handledUpdateProduct = (id) => {
        updateProduct(id)
    }

    return (
        <>
            <TableItem item={item} key={1} count={count} cols={cols} SettingClick={handledUpdateProduct} RemoveClick={handledDeleteProduct} />
        </>
    );
}

export default ProductTableItem;