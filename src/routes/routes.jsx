import React from 'react';
import PropTypes from 'prop-types';
import Home from './../component/pages/home/Home';
import Product from '../component/pages/Product/Product';
import Category from '../component/pages/Category/Category';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductProvider from '../context/ProductProvider';
// import CategoryProvider from '../context/CategoryContext';

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
        icon: PrecisionManufacturingIcon,
        provider: ProductProvider



    },

    {
        path: "/category",
        element: Category,
        name: "Quản Lý Danh Mục Sản Phẩm",
        icon: CategoryIcon,
        // provider: CategoryProvider

    },








]





