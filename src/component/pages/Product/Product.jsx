import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import "./style.scss"
import { Box, Pagination } from '@mui/material';
import TitleContent from '../../TitleContent/TitleContent';


import ProductTable from '../../ProductTable/ProductTable';
import { ProductContext } from '../../../context/ProductProvider';
import PaginationTable from '../../PaginationTable/PaginationTable';
import InputSearch from '../../InputSearch/InputSearch';
import { Filter } from '@mui/icons-material';
import FilterSelect from '../../FilterSelect/FilterSelect';

Product.propTypes = {

};

function Product(props) {

    const { products } = useContext(ProductContext);



    return (



        <Box className="dashboard-wrapper" >




            <Box>
                <TitleContent content="Quản Lí Sản Phẩm" />

                <Box

                    sx={{
                        margin: "10px 0px",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >


                    <Box>
                        <InputSearch />
                    </Box>
                    <Box sx={{ width: "200px" }}>
                        <FilterSelect />
                    </Box>


                </Box>
                <Box mt="20px">
                    <ProductTable data={products} />
                </Box>



            </Box>

            <Box sx={{

            }}>

                <PaginationTable sx={{
                    "marginTop": "25px",
                    display: "flex",
                    justifyContent: "flex-end"



                }}
                />

            </Box>





        </Box>

    );
}

export default Product;