import React from 'react';
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

ContentTable.propTypes = {

};

function createData(name, calories, fat, carbs, protein) {

    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function ContentTable(col = {}, data) {
    return (
        <Paper elevation={8}
        >
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Dessert (100g serving)</TableCell>
                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Calories</TableCell>
                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Fat&nbsp;(g)</TableCell>
                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Carbs&nbsp;(g)</TableCell>
                            <TableCell sx={{
                                fontWeight: "bold",
                                fontSize: "18px",
                                color: myColor.greenSecond
                            }} align="center">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">{row.carbs}</TableCell>
                                <TableCell align="center">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper >
    );
}

export default ContentTable;