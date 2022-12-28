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
import { ProductContext } from '../../context/ProductProvider';
import TableItem from './TableItem/TableItem';




// function createData(col]) {

//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


function ProductTable({ data }) {
    // console.log(cols);
    return (
        <Paper elevation={8}  >
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">STT</TableCell>


                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Tên</TableCell>

                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Giá Cũ</TableCell>
                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Giá Mới</TableCell>

                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Hành Động</TableCell>



                        </TableRow>
                    </TableHead>

                    <TableBody>


                        {data.map((row, index) => {


                            return (<TableItem row={row} key={row.id} count={index} />)
                        })}




                    </TableBody>




                </Table>
            </TableContainer>
        </Paper >
    );
}

export default ProductTable;