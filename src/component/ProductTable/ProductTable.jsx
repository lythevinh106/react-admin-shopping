import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import myColor from '../myColor/myColor';


import TableItem from './TableItem/TableItem';
import ProductTableItem from './ProductTableItem/ProductTableItem';
import CategoryTableItem from './CategoryTableItem/CategoryTableItem';
import OrderTableItem from './OrderTableItem/OrderTableItem';





function ProductTable({ data, cols, type = "product" }) {
    // console.log(data);
    // console.log(cols);
    return (
        <Paper elevation={8}  >


            <TableContainer component={Paper} sx={{ minHeight: "400px" }}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">STT</TableCell>

                            {cols.map((col, i) => {
                                return (
                                    <TableCell key={i} sx={{
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                        color: myColor.greenSecond
                                    }} align="center">{col.title}</TableCell>)
                            })}

                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Hành Động</TableCell>




                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {data.map((item, i) => {

                            // console.log(Object.keys(item))
                            switch (type) {
                                case "product": {

                                    return (
                                        <ProductTableItem key={item.id} item={item} count={i} cols={cols} />)

                                }
                                case "category": {
                                    return (
                                        <CategoryTableItem key={item.id} item={item} count={i} cols={cols} />)

                                }
                                case "order": {
                                    return (
                                        <OrderTableItem key={item.id} item={item} count={i} cols={cols} />)

                                }
                                default: {
                                    // do something
                                }
                            }




                        })}






                    </TableBody>




                </Table>
            </TableContainer>

        </Paper >
    );
}

export default ProductTable;