import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import "./style.scss"
import { Box, Button, Pagination } from '@mui/material';
import { TypoTitleContent } from '../../CustomTypo/CustomTypo';


import ProductTable from '../../ProductTable/ProductTable';
import ProductProvider, { ProductContext } from '../../../context/ProductProvider';
import PaginationTable from '../../PaginationTable/PaginationTable';
import InputSearch from '../../InputSearch/InputSearch';
import { Filter } from '@mui/icons-material';
import FilterSelect from '../../FilterSelect/FilterSelect';
import myColor from '../../myColor/myColor';
import { ButtonAddNew } from '../../CustomButton/CustomButton';

Product.propTypes = {

};




function Product(props) {

    const { products, filter,
        totalPage,
        handleChangePage,
        handleSortChange,
        handleSearch
        , setProductUpdate, setIsDrawer
    } = useContext(ProductContext);

    return (

        // <ProductProvider>
        <Box className="dashboard-wrapper" >




            <Box>


                <TypoTitleContent>Quản Lí Sản Phẩm</TypoTitleContent>


                <Box

                    sx={{
                        margin: "10px 0px",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >


                    <Box>
                        <ButtonAddNew onClick={() => {
                            setIsDrawer(true)
                            setProductUpdate(null)
                        }}> Thêm Sản Phẩm </ButtonAddNew>
                    </Box>



                </Box>

                <Box

                    sx={{
                        margin: "10px 0px",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >


                    <Box>
                        <InputSearch onChange={handleSearch} />
                    </Box>
                    <Box sx={{ width: "200px" }}>
                        <FilterSelect onSortChange={handleSortChange} />
                    </Box>



                </Box>
                <Box mt="20px">
                    <ProductTable type="product" data={products} cols={

                        [
                            { title: "Tên Sản Phẩm", field: "name" },
                            { title: "Giá Cũ", field: "origin_price" },
                            { title: "Gía Mới", field: "sale_price" },

                        ]
                    } />
                </Box>



            </Box>

            <Box sx={{

            }}>


                <PaginationTable sx={{
                    "marginTop": "25px",
                    display: "flex",
                    justifyContent: "flex-end"



                }}

                    count={totalPage}
                    page={filter.page}

                    onChange={handleChangePage}
                />

            </Box>





        </Box>
        // </ProductProvider >

    );
}

export default Product;