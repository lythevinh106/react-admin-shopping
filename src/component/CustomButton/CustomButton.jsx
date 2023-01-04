import React from 'react';
import PropTypes from 'prop-types';
import { Button, styled } from '@mui/material';
import myColor from '../myColor/myColor';





export const ButtonAddNew = styled(Button)({
    variant: 'contained',
    backgroundColor: "#F08080",
    color: "white",
    "&:hover": {
        backgroundColor: "#F08080"
    }

})


export const MyButtonRemove = styled(Button)({

    color: "white",
    height: "48px",
    backgroundColor: "#DC3545",

    "&:hover": {
        backgroundColor: "#DC3523"
    }


})




export const MyButtonSetting = styled(Button)({

    color: "white",
    height: "48px",
    backgroundColor: "#28A745",

    "&:hover": {
        backgroundColor: myColor.greenDefault
    }


})