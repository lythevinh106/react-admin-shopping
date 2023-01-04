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
    originPrice: number()
        .typeError("dữ liệu phải là kiểu số")
        .max(1000000000, 'Tối da là 1.000.000.000')
        .required("trường này không được bỏ trống")


    ,
    newPrice: number()

        .typeError("dữ liệu phải là kiểu số")
        .max(1000000000, 'Tối da là 1.000.000.000')
        .required("trường này không được bỏ trống").test(`compare more less ${ref("originPrice")}`, "Giá Mới phải bé hơn giá gốc",
            (value, context) => {
                if (value < context.parent.originPrice) {
                    return true
                }
            })
    ,


    description: string().required("trường này không được bỏ trống").min(3, `Tối thiểu Có 3 kí tự`),


}).required();



function FormCreateProduct({ productUpdate = {}, onSubmit }) {





    console.log(productUpdate);
    // const [data, setData] = useState({
    //     name: productUpdate.name,
    //     originPrice: productUpdate.oldPrice,
    //     newPrice: productUpdate.salePrice,
    //     active: 1,
    //     categoryId: 0,
    // })

    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    ////handle validate form

    const form = useForm({
        resolver: yupResolver(schema),

        // defaultValues:
        // {

        //     name: productUpdate?.name,
        //     description: "",
        //     originPrice: "",
        //     newPrice: "",
        //     active: 1,
        //     categoryId: 0,



        // }
    });;


    const { register, handleSubmit, watch, formState: { errors } } = form

    // console.log(errors)

    const handleOnSubmit = data => {
        onSubmit(data)
    };



    // useState(() => {
    //     form.setValue("name", productUpdate);
    // }, [productUpdate])

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Box sx={{


            }}>
                <Typography variant='h5' sx={{ color: myColor.greenDefault, padding: "5px 0px ", fontWeight: "bold", textAlign: "center", margin: "10px 0" }}>
                    {productUpdate?.name ? "Cập Nhật Sản Phẩm" : "Thêm Mới Sản Phẩm"}
                </Typography>

                <Box sx={{
                    width: "80%",
                    margin: "0 auto"
                }}>

                    <input defaultValue={productUpdate.name} />

                    <InputField defaultValue={productUpdate.name} sx={{ marginTop: "15px" }} form={form} name="name" label="Tên Sản Phẩm" />
                    <InputField sx={{ marginTop: "15px" }} type="number" form={form} name="originPrice" label=" Giá Gốc" />
                    <InputField sx={{ marginTop: "15px" }} type="number" form={form} name="newPrice" label=" Giá Mới" />

                    <InputField sx={{ marginTop: "15px" }} form={form} name="description" label="Mô Tả" multiline rows={8} />

                    <FormControl fullWidth sx={{
                        marginTop: "35px"
                    }}>
                        <InputLabel id="demo-simple-select-label">Chọn Danh Mục</InputLabel>
                        <Select
                            {...register("categoryId")}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            value={category}

                            variant="standard"
                            fullWidth
                            label="Chọn Danh Mục Cho Sản Phẩm Của Bạn"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Điện thoại</MenuItem>
                            <MenuItem value={20}>LapTop</MenuItem>
                            <MenuItem value={30}>Gia Dụng</MenuItem>
                        </Select>
                    </FormControl>



                    <FormControl sx={{ marginTop: "15px" }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Kích Hoạt Sản Phẩm</FormLabel>

                        <RadioGroup

                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"

                        >
                            <FormControlLabel value="1" control={<Radio {...register("active")} />} label="Kích Hoạt" />
                            <FormControlLabel value="0" control={<Radio {...register("active")} />} label="Hủy Kích Hoạt" />


                        </RadioGroup>
                    </FormControl>
                    <Box mt="15px" textAlign="center"><Button type='submit' fullWidth variant="contained" sx={{
                        backgroundColor: myColor.greenDefault,
                        "&:hover": {
                            backgroundColor: myColor.greenDefault,
                        }
                    }} >
                        {productUpdate?.name ? "Cập Nhật Sản Phẩm" : "Tạo"}


                    </Button></Box>

                </Box>



            </Box>
        </form>
    );
}

export default FormCreateProduct;