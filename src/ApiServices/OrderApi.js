import React from 'react';
import PropTypes from 'prop-types';

import AxiosAdmin from "./AxiosAdmin"

const OrderApi = {

    getListOrder(newsParam) {

        return AxiosAdmin.post("/order/showAll", null, {
            params: {
                ...newsParam
            },

        });



    },

    getDetailOrder(id) {

        return AxiosAdmin.post("/order/showDetailOrder/" + id);



    },

    updateStatusOrder(data) {

        return AxiosAdmin.post("/order", data);



    },
    removeOrder(id) {

        return AxiosAdmin.post("/order/removeOrder/" + id);



    },








}







export default OrderApi;