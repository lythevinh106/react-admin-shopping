import React from 'react';
import PropTypes from 'prop-types';
import Home from './../component/pages/home/Home';
import Product from '../component/pages/Product/Product';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
export const publicRoutes = [
    {
        path: "/",
        element: Home,
        name: "DashBoard",
        icon: DashboardIcon



    },


    {
        path: "/products",
        element: Product,
        name: "Quản Lý Sản Phẩm",
        icon: PrecisionManufacturingIcon



    },

    {
        path: "/category",
        element: Product,
        name: "Quản Lý Danh Mục Sản Phẩm",
        icon: CategoryIcon

    },








]





