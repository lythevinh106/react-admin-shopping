import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { ProductContext } from '../../../context/ProductProvider';
import FormCreateProduct from '../../Form/FormCreateProduct/FormCreateProduct';
import { useDispatch } from 'react-redux';


DrawerCreate.propTypes = {

};

function DrawerCreate({ component = <></> }) {
    // const { isDrawer, setIsDrawer } = useContext(ProductContext);




    return (

        <Box
            sx={{ width: "700px" }}
            role="presentation"
        // onClick={() => setIsDrawer(false)}
        // onKeyDown={(e) => { setIsDrawer(false) }}

        >
            {
                component
            }





        </Box >

    );
}

export default DrawerCreate;