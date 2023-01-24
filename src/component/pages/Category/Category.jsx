import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Pagination } from '@mui/material';
import { TypoTitleContent } from '../../CustomTypo/CustomTypo';


import ProductTable from '../../ProductTable/ProductTable';

import PaginationTable from '../../PaginationTable/PaginationTable';
import InputSearch from '../../InputSearch/InputSearch';
import { Filter } from '@mui/icons-material';
import FilterSelect from '../../FilterSelect/FilterSelect';
import myColor from '../../myColor/myColor';
import { ButtonAddNew } from '../../CustomButton/CustomButton';
import { CategoryContext } from '../../../context/CategoryProvider';







function Category(props) {

    const {
        categories,
        filter,
        totalPage,
        handleChangePage,
        handleSortChange,
        handleSearch,
        setIsDrawer,
        categoryUpdate,
        setCategoryUpdate,
        currentPage
    } = useContext(CategoryContext);

    return (


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
                            setCategoryUpdate(null)
                        }}> Thêm Danh Mục </ButtonAddNew>
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
                    <ProductTable type="category" data={categories} cols={

                        [
                            { title: "Tên danh mục", field: "name" },
                            { title: "Slug", field: "slug" },


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
                    page={currentPage}

                    onChange={handleChangePage}
                />

            </Box>





        </Box>


    );
}

export default Category;