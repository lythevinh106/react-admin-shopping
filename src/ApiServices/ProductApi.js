import React from 'react';
import PropTypes from 'prop-types';

import AxiosAdmin from "./AxiosAdmin"

const ProductApi = {

    getAllProduct(newsParam) {

        return AxiosAdmin.get("/products", {
            params: {
                ...newsParam
            }

        });



    },


    deleteProduct(id) {

        return AxiosAdmin.delete(`/product/${id}`, {



        });



    },
    // deleteCategory(id) {

    //     return AxiosAdmin.delete(`/category/${id}`, {



    //     });



    // },




}







export default ProductApi;