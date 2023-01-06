import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import myColor from '../../myColor/myColor';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Button, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { object, string, number, date, InferType, ref } from 'yup';
import InputField from '../InputField/InputField';
import { ProductContext } from '../../../context/ProductProvider';



const schema = yup.object({
    name: string().required("trường này không được bỏ trống").min(3, `Tối thiểu Có 3 kí tự`),
    slug: string().required("trường này không được bỏ trống").min(3, `Tối thiểu Có 3 kí tự`)

}).required();


function FormUpdateCategory({ categoryUpdate, onSubmitUpdate = () => { } }) {


    const [category, setCategory] = React.useState(categoryUpdate);




    useEffect(() => {


        setCategory(categoryUpdate);


    }, [categoryUpdate])





    const form = useForm({
        resolver: yupResolver(schema),

        defaultValues:
        {

            name: categoryUpdate.name,
            slug: categoryUpdate.slug,
            id: categoryUpdate.id




        }
    });;

    const { register, handleSubmit, watch, formState: { errors } } = form

    // console.log(errors)

    const handleOnSubmit = data => {
        onSubmitUpdate(data);
    };




    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Box sx={{


            }}>
                <Typography variant='h5' sx={{ color: myColor.greenDefault, padding: "5px 0px ", fontWeight: "bold", textAlign: "center", margin: "10px 0" }}>
                    Cập Nhật Danh Mục
                </Typography>

                <Box sx={{
                    width: "80%",
                    margin: "0 auto"
                }}>


                    <InputField sx={{ marginTop: "15px" }}
                        form={form} type="text" name="name" label="Tên Danh Mục"
                    />

                    <InputField sx={{ marginTop: "15px" }}
                        form={form} type="text" name="slug" label="Tên Slug"

                    />






                    <Box mt="15px" textAlign="center"><Button type='submit' fullWidth variant="contained" sx={{
                        backgroundColor: myColor.greenDefault,
                        "&:hover": {
                            backgroundColor: myColor.greenDefault,
                        }
                    }} >
                        Sửa Danh Mục


                    </Button></Box>

                </Box>



            </Box>
        </form>
    );
}

export default FormUpdateCategory;