import React from 'react';
import PropTypes from 'prop-types';
import TableItem from '../TableItem/TableItem';
import { useDispatch } from 'react-redux';
import { toggleDeleteForm, toggleUpdateForm } from '../../../features/order/orderSlice';



function OrderTableItem({ item, count, cols }) {

    const dispatch = useDispatch();
    const handledDeleteOrder = (id) => {
        dispatch(toggleDeleteForm(id))
    }

    const handledUpdateOrder = (id) => {
        dispatch(toggleUpdateForm(id))
    }

    return (
        <>
            <TableItem item={item} key={1} count={count} cols={cols} SettingClick={handledUpdateOrder} RemoveClick={handledDeleteOrder} />
        </>
    );
}


export default OrderTableItem;