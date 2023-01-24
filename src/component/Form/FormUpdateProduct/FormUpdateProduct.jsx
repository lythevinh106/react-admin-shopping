import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import myColor from '../../myColor/myColor';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Button, FormHelperText, ImageList, ImageListItem, InputLabel, MenuItem, NativeSelect, Select, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { object, string, number, date, InferType, ref } from 'yup';
import InputField from '../InputField/InputField';
import { ProductContext } from '../../../context/ProductProvider';
import CategoryApi from '../../../ApiServices/CategoryApi';


const schema = yup.object({
    name: string().required("trường này không được bỏ trống").min(3, `Tối thiểu Có 3 kí tự`),
    category_id: number().required("trường này không được bỏ trống"),
    title: string().required("trường này không được bỏ trống").min(3, `Tối thiểu Có 3 kí tự`),

    origin_price: number()
        .typeError("dữ liệu phải là kiểu số")
        .max(1000000000, 'Tối da là 1.000.000.000')
        .required("trường này không được bỏ trống")
    ,
    sale_price: number()
        .typeError("dữ liệu phải là kiểu số")
        .max(1000000000, 'Tối da là 1.000.000.000')
        .required("trường này không được bỏ trống").test(`compare more less ${ref("origin_price")}`, "Giá Mới phải bé hơn giá gốc",
            (value, context) => {
                if (value < context.parent.origin_price) {
                    return true
                }
            })
    ,



    description: string().required("trường này không được bỏ trống").min(3, `Tối thiểu Có 3 kí tự`),


}).required();



function FormUpdateProduct({ productUpdate = {}, onSubmit }) {

    // console.log(productUpdate.category_id);

    const [category, setCategory] = React.useState('');
    const [active, setActive] = React.useState(1);
    const [categoryId, setCategoryId] = React.useState(productUpdate.category_id);

    const [image, setImage] = React.useState("");
    const [productImages, setProductImages] = React.useState([]);

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    // console.log(productUpdate);


    useEffect(() => {
        setCategoryId(productUpdate.category_id)
    }, [productUpdate])


    useEffect(() => {
        (async () => {

            try {
                const response = await CategoryApi.getAllCategory({ limit: 1000 });
                setCategory(response.data);

            } catch (error) {

            }


        })();
    }, [])

    ////handle validate form

    const form = useForm({
        resolver: yupResolver(schema),

        defaultValues:
        {

            name: productUpdate?.name,
            title: productUpdate?.title,
            origin_price: productUpdate?.origin_price,
            sale_price: productUpdate?.sale_price,
            category_id: category || productUpdate?.category_id
            ,
            description: productUpdate?.description,

            active: productUpdate?.active,
            id: productUpdate?.id,
            product_images: "",
            image: "",



        }
    });;


    const { register, handleSubmit, watch, formState: { errors } } = form

    //  console.log(errors)

    const handleOnSubmit = data => {
        // console.log(data.id);
        // console.log("data dc update", data)
        onSubmit(data)
    };



    const handleActiveChange = (event) => {
        setActive(parseInt(event.target.value));
    }


    const handleChangeCategoryId = (e) => {
        // console.log(e.target.value);
        setCategoryId(e.target.value);
        form.setValue("category_id", e.target.value);
    }

    const handleImageOnChange = (event) => {
        // console.log(event.target.files[0]);

        setImage(URL.createObjectURL(event.target.files[0]));
        form.setValue('image', event.target.files[0]);
    }


    const handleProductImagesOnChange = (event) => {



        let allUrl = [];
        let files = [];

        for (let file of event.target.files) {
            // console.log(file)
            files.push(file);
            let url = URL.createObjectURL(file);
            allUrl.push(url);


        }


        form.setValue('product_images[]', files);



        setProductImages(allUrl);
    }

    // console.log(image);
    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Box sx={{


            }}>
                <Typography variant='h5' sx={{ color: myColor.greenDefault, padding: "5px 0px ", fontWeight: "bold", textAlign: "center", margin: "10px 0" }}>
                    Cập Nhât Sản Phẩm
                </Typography>

                <Box sx={{
                    width: "80%",
                    margin: "0 auto"
                }}>



                    <InputField sx={{ marginTop: "15px" }} form={form} name="name" label="Tên Sản Phẩm" />


                    <InputField sx={{ marginTop: "15px" }} form={form} name="title" label="Tiêu Đề" />
                    <InputField sx={{ marginTop: "15px" }} type="number" form={form} name="origin_price" label=" Giá Gốc" />
                    <InputField sx={{ marginTop: "15px" }} type="number" form={form} name="sale_price" label=" Giá Mới" />

                    <InputField sx={{ marginTop: "15px" }} form={form} name="description" label="Mô Tả" multiline rows={8} />


                    <Box sx={{ marginTop: "20px" }}>

                        <Button variant="contained" component="label">
                            Upload Ảnh Chính
                            <input style={{

                                height: "auto"
                            }} hidden accept="image/*" type="file"

                                {...register("image")}

                                onChange={handleImageOnChange}
                            />
                        </Button>
                        <Typography color="#D32F2F"  >

                            {errors?.image?.message}</Typography>
                        <Box sx={{
                            width: "200px",
                            height: "auto"
                        }}>
                            <img style={{
                                width: "100%",
                                height: "auto",
                                object: "cover"
                            }} src={image || productUpdate?.image} alt="" />



                        </Box>

                    </Box>


                    <Box sx={{ margin: "20px 0px" }}>

                        <Button variant="contained" component="label">
                            Upload Ảnh Phụ (nhiều ảnh)
                            <input hidden accept="image/*" multiple type="file"

                                name="product_images[]"

                                {...register("product_images[]")}

                                onChange={handleProductImagesOnChange}
                            />
                        </Button>
                        <Typography color="#D32F2F"  >

                            {/* {errors?.product_images?.message} */}

                        </Typography>

                        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>


                            {productImages.length <= 0 ?

                                productUpdate?.product_images?.map((item, index) => (
                                    <ImageListItem key={index}>
                                        <img
                                            src={item}
                                            srcSet={item}
                                            alt={item}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                )

                                ) :

                                productImages.map((item, index) => (
                                    <ImageListItem key={index}>
                                        <img
                                            src={item}
                                            srcSet={item}
                                            alt={item}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                )

                                )



                            }
                        </ImageList>



                    </Box>




                    {/* {console.log(category[0]?.id)} */}

                    <FormControl

                        error={errors["category_id"] ? true : false}

                        fullWidth
                        sx={{
                            marginTop: "35px"
                        }}>


                        <Typography fontSize={14} color="primary" variant="standard" htmlFor="uncontrolled-native">Danh Mục Cho Sản Phẩm</Typography>





                        <NativeSelect

                            {...register("category_id")}
                            onChange={handleChangeCategoryId}
                            value={categoryId}
                            inputProps={{
                                name: 'category_id',
                                id: 'uncontrolled-native',
                                label: "Chọn danh mục"

                            }}
                        >

                            {category && (
                                category.map((cat) => {


                                    return (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>

                                    )
                                })
                            )}


                        </NativeSelect>







                        <FormHelperText>{errors?.category_id?.message}</FormHelperText>
                    </FormControl>



                    <FormControl sx={{ marginTop: "15px" }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Kích Hoạt Sản Phẩm</FormLabel>

                        <RadioGroup

                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handleActiveChange}

                            value={active}

                        >
                            <FormControlLabel value={0} control={<Radio {...register("active")} />} label="Hủy Kích Hoạt" />
                            <FormControlLabel value={1} control={<Radio {...register("active")} />} label="Kích Hoạt" />



                        </RadioGroup>
                    </FormControl>




                    <Box mt="15px" textAlign="center"><Button type='submit' fullWidth variant="contained" sx={{
                        backgroundColor: myColor.greenDefault,
                        "&:hover": {
                            backgroundColor: myColor.greenDefault,
                        }
                    }} >
                        Cập Nhât Sản Phẩm


                    </Button></Box>

                </Box>



            </Box>
        </form >
    );
}

export default FormUpdateProduct;