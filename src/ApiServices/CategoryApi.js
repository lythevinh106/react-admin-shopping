import React from 'react';
import PropTypes from 'prop-types';

import AxiosAdmin from "./AxiosAdmin"

const CategoryApi = {

    getAllCategory(newsParam) {

        return AxiosAdmin.get("/category", {
            params: {
                ...newsParam
            }

        });



    },
    deleteCategory(id) {

        return AxiosAdmin.delete(`/category/${id}`, {



        });



    },

    addCategory(data) {

        return AxiosAdmin.post(`/category`, data);





    },
    updateCategory(id, data) {

        return AxiosAdmin.post(`/category/edit/${id}`, data);





    },
    showCategory(id) {

        return AxiosAdmin.get(`/category/${id}`);





    },

    // getProduct(productId) {

    //     return AxiosClient.get(`/products/${productId}`);

    // },



}







export default CategoryApi;