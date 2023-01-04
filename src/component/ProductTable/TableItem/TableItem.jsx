import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, styled } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import myColor from '../../myColor/myColor';

import { MyButtonRemove, MyButtonSetting } from '../../CustomButton/CustomButton';



TableItem.propTypes = {

};

function TableItem({ item, count, cols, SettingClick = () => { }, RemoveClick = () => { } }) {

    // const { deleteCategory, updateCategory } = useContext(CategoryContext);

    const handleSettingClick = (id) => {
        SettingClick(id);
    }

    const handleRemoveClick = (id) => {

        RemoveClick(id);

    }





    return (
        <>
            <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center" component="th" scope="row">
                    {count + 1}
                </TableCell>
                {cols.map((col, i) => {

                    if (Object.keys(item).includes(col.field)) {

                        return (


                            <TableCell key={i} align="center" component="th" scope="row" >
                                <>
                                    {item[col.field]}
                                </>
                            </TableCell>

                        )


                    }
                })}

                <TableCell align="center" sx={{

                }}>

                    <MyButtonSetting sx={{ marginRight: "5px" }} onClick={() => handleSettingClick(item.id)}>
                        <SettingsIcon />
                    </MyButtonSetting>
                    <MyButtonRemove sx={{ marginLeft: "5px" }} onClick={() => handleRemoveClick(item.id)}>
                        <DeleteForeverIcon />
                    </MyButtonRemove>


                </TableCell>




            </TableRow >




        </>
    );
}

export default TableItem;