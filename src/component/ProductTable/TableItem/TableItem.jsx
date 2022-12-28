import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, styled } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import myColor from '../../myColor/myColor';
import { ProductContext } from '../../../context/ProductProvider';


TableItem.propTypes = {

};

export const MyButtonRemove = styled(Button)({

    color: "white",
    height: "48px",
    backgroundColor: "#DC3545",

    "&:hover": {
        backgroundColor: "#DC3523"
    }


})




export const MyButtonSetting = styled(Button)({

    color: "white",
    height: "48px",
    backgroundColor: "#28A745",

    "&:hover": {
        backgroundColor: myColor.greenDefault
    }


})

function TableItem({ row, count }) {


    const { deleteProduct, updateProduct } = useContext(ProductContext);


    const handleSettingClick = (id) => {
        updateProduct(id)
    }

    const handleRemoveClick = (id) => {
        deleteProduct(id)
    }





    return (
        <>
            <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center" component="th" scope="row">
                    {count + 1}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.oldPrice}</TableCell>
                <TableCell align="center">{row.salePrice}</TableCell>
                <TableCell align="center" sx={{

                }}>

                    <MyButtonSetting sx={{ marginRight: "5px" }} onClick={() => handleSettingClick(row.id)}>
                        <SettingsIcon />
                    </MyButtonSetting>
                    <MyButtonRemove sx={{ marginLeft: "5px" }} onClick={() => handleRemoveClick(row.id)}>
                        <DeleteForeverIcon />
                    </MyButtonRemove>


                </TableCell>




            </TableRow >




        </>
    );
}

export default TableItem;