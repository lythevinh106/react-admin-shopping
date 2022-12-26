import React from 'react';
import PropTypes from 'prop-types';
import "./style.scss"
import { Box } from '@mui/material';
import TitleContent from '../../TitleContent/TitleContent';
import ContentTable from '../../ContentTable/ContentTable';
Product.propTypes = {

};

function Product(props) {
    return (
        <Box className="dashboard-wrapper" >
            <Box>
                <TitleContent content="Quản Lí Sản Phẩm" />
                <Box mt="20px">
                    <ContentTable />
                </Box>


            </Box>

        </Box>
    );
}

export default Product;