import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../inc/Header/Header';
import SideBar from '../../inc/SideBar/SideBar';
import "./style.scss"
import { Box } from '@mui/system';
import { Stack } from 'react-bootstrap';
import ProductProvider from '../../../context/ProductProvider';
DefaultLayout.propTypes = {

};

function DefaultLayout({ children }) {
    return (
        <ProductProvider>
            <Stack className="dashboard-main-wrapper" direction='column'>

                <Box className="dashboard-header" sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "79px",
                }}>
                    <Header />
                </Box>

                <Box  >
                    <Stack sx={{


                    }}
                        direction="row"
                    >

                        <Box className="dashboard-sidebar" sx={{
                            position: "fixed",
                            left: 0,
                            top: "70px",
                            width: "263px",

                        }} >
                            <SideBar />

                        </Box>

                        <Box className="dashboard-content" padding="25px" margin="71px 0px 0px 263px" >
                            {children}
                        </Box>
                    </Stack>
                </Box>









            </Stack>
        </ProductProvider>
    );
}

export default DefaultLayout;