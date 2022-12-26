import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import "./style.scss"
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import myColor from '../../myColor/myColor';
import { Stack } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { publicRoutes } from "../../../routes/routes"
import AlbumIcon from '@mui/icons-material/Album';
SideBar.propTypes = {

};


function SideBar(props) {


    const [menus, setMenus] = useState(publicRoutes)
    return (



        <div className='sidebar-wrapper'>
            <Box


                sx={{

                    background: 'rgba(13, 11, 40,1)',

                    height: `700px`,
                    padding: "5px 15px 0px 15px",
                    // marginTop: "71px"


                }}>

                <Box
                    color={myColor.colorSizeBar}
                >
                    <Typography variant='h7' color="inherit" fontWeight="bold" ml="4px">
                        Menu
                    </Typography>


                    <Box>

                        {menus.map((menu) => {
                            return (
                                <Link to={menu.path} key={menu.path}>
                                    <Stack
                                        padding="8px 5px" marginTop="10px" direction="row" justifyContent="space-between" alignItems="center"
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: 'rgba(255,255,255,0.3)'
                                            }
                                        }}
                                    >
                                        <Stack direction="row" alignItems="center" >
                                            <menu.icon sx={{ fontSize: "24px" }} />

                                            <Typography fontWeight="bold" fontSize="14px" ml="10px">{menu.name}</Typography>
                                        </Stack>

                                        <AlbumIcon fontSize="14px" />

                                    </Stack>
                                </Link>

                            )
                        })}



                    </Box>



                </Box>



            </Box>

        </div>
    );
}

export default SideBar;