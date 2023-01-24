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
    addProduct(data) {

        return AxiosAdmin.post(`/product`, data,
            { headers: { 'content-type': 'multipart/form-data; boundary=<calculated when request is sent>' } }
        )
        // .catch(function (error) {
        //     console.log(error.toJSON());
        // });;





    },


    updateProduct(id, data) {

        return AxiosAdmin.post(`/product/edit/${id}`, data,
            { headers: { 'content-type': 'multipart/form-data; boundary=<calculated when request is sent>' } }
        )
        // .catch(function (error) {
        //     console.log(error.toJSON());
        // });;





    },

    getAllProductImages(id) {
        return AxiosAdmin.get(`/productImages/${id}`, {

        });
    },





}







export default ProductApi;