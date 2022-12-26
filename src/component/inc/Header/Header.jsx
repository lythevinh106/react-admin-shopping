import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';


import { Avatar, Button, Grid, InputAdornment, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { customTheme } from '../../CreateTheme';
import { AccountCircle } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { style } from '@mui/system';
import styled from 'styled-components';
import myColor from '../../myColor/myColor';
Header.propTypes = {

};

function Header(props) {

    // const 
    // ButtonSearch = styled(Button)({
    //     borderRadius: "20px",
    //     color: "white",
    //     textAlign: "center"

    // })



    return (

        <div className="dashboard-header" style={{

        }}>

            <Paper elevation={12} >

                <Box sx={{
                    maxWidth: "100%", height: "70px",
                    padding: "0px 18px",

                }}>
                    <Grid container alignItems={"center"} height="100%">

                        <Grid item lg={2}>
                            <Typography

                                color={myColor.greenSecond}

                                sx={{
                                    fontWeight: "bold"
                                }} variant='h4'>HALO SHOP</Typography>

                        </Grid>
                        <Grid item lg={8} sx={
                            {
                                display: "flex",
                                justifyContent: "flex-end"
                                ,

                            }
                        }>
                            <Paper elevation={4}>
                                <TextField
                                    label="Tìm Kiếm"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: 15

                                    }}

                                />
                            </Paper>
                            <Button

                                sx={{
                                    marginLeft: "20px",
                                    borderRadius: 10,
                                    backgroundImage: `linear-gradient(${myColor.greenSecond},${myColor.greenDefault})`,
                                    color: "white"

                                }}>
                                <SearchIcon />
                            </Button>



                        </Grid>
                        <Grid item lg={2}
                            sx={
                                {
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                        >
                            <Avatar />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

        </div >

    );
}

export default Header;