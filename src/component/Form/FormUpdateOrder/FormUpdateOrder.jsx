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
import { useSelector } from 'react-redux';
import OrderApi from '../../../ApiServices/OrderApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { width } from '@mui/system';
import FormatPrice from "../../../until/FormatPrice/FormatPrice"
const schema = yup.object({
    name: string().required("trường này không được bỏ trống").min(3, `Tối thiểu Có 3 kí tự`),
    status: number().required("trường này không được bỏ trống"),



}).required();


const listFilterStatus = [
    {
        name: "Hủy Đơn Hàng",
        value: -1
    },
    {
        name: "Chờ Xác Nhận",
        value: 0
    },
    {
        name: "Đã Xác Nhận",
        value: 1
    },
    {
        name: "Đang Vận Chuyển",
        value: 2
    },
    {
        name: "Giao Thành Công",
        value: 3
    },

]


function FormUpdateOrder({ orderUpdate = {}, onSubmit }) {


    // const isOpenUpdateForm = useSelector((state) => state.order.isOpenUpdateForm)







    const [status, setStatus] = useState(orderUpdate.status);

    const [infoUpdate, setInfoUpdate] = useState([]);



    useEffect(() => {

    }, [status])

    useEffect(() => {
        const resultUpdate = { ...orderUpdate }
        console.log(resultUpdate);
        const infoProducts = resultUpdate.products;
        const infoOrderItems = resultUpdate.order_items;

        let arrResult = [];

        arrResult = infoProducts.map((productItem, indexProduct) => {


            for (let i = 0; i < infoOrderItems.length; i++) {
                if (infoOrderItems[i].product_id == productItem.id) {
                    // infoProducts[indexProduct].quantity = order_item.quantity

                    return {
                        ...productItem,
                        quantity: infoOrderItems[i].quantity
                    }
                }
            }



        });

        // console.log(arrResult);

        setInfoUpdate(arrResult);




    }, [])



    const handleChangeStatus = (e) => {

        setStatus(e.target.value);
        // form.setValue("status", e.target.value);
    }





    const form = useForm({
        resolver: yupResolver(schema),

        defaultValues:
        {

            name: orderUpdate?.name,
            phone: orderUpdate?.phone,
            email: orderUpdate?.email,
            address: orderUpdate?.address,
            // status: status,
            order_id: orderUpdate.id


        }
    });


    const { register, handleSubmit, watch, formState: { errors } } = form

    //  console.log(errors)

    const handleOnSubmit = (data) => {
        // console.log("dataa");
        // console.log(data)
        onSubmit(data)
    };






    // console.log(status);

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>




            <Box sx={{


            }}>







                <Typography variant='h5' sx={{ color: myColor.greenDefault, padding: "5px 0px ", fontWeight: "bold", textAlign: "center", margin: "10px 0" }}>
                    Cập Nhật Đơn Hàng
                </Typography>

                <Box sx={{
                    width: "80%",
                    margin: "0 auto"
                }}>


                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow >

                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Tên Hàng Hóa</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Hình Ảnh</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Số Lượng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">Giá</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {infoUpdate.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center" component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{
                                                    height: "104px",
                                                    width: "auto"
                                                }}>
                                                    <img style={{
                                                        width: "auto",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }} src={row.image} alt="" />
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">{row.quantity}</TableCell>
                                            <TableCell align="center"> {FormatPrice(row.sale_price)}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>



                    <InputField readOnly={true} sx={{ marginTop: "15px" }} form={form} name="name" label="Tên Khách Hàng" />
                    <InputField readOnly sx={{ marginTop: "15px" }} form={form} name="phone" label="Số Điện Thoại" />
                    <InputField readOnly sx={{ marginTop: "15px" }} form={form} name="email" label="Email" />

                    <InputField readOnly sx={{ marginTop: "15px" }} form={form} name="address" label="Địa Chỉ" multiline rows={8} />










                    {/* {console.log(category[0]?.id)} */}

                    <FormControl

                        error={errors["category_id"] ? true : false}

                        fullWidth
                        sx={{
                            marginTop: "35px"
                        }}>


                        <Typography fontSize={14} color="primary" variant="standard" htmlFor="uncontrolled-native">Trạng Thái Đơn Hàng</Typography>





                        <NativeSelect

                            {...register("status")}
                            onChange={handleChangeStatus}
                            value={status}
                            inputProps={{
                                name: 'status',
                                id: 'uncontrolled-native',
                                label: "Trạng Thái Đơn Hàng"

                            }}
                        >

                            {listFilterStatus && (
                                listFilterStatus.map((sat) => {


                                    return (
                                        <option key={sat.value} value={sat.value}>{sat.name}</option>

                                    )
                                })
                            )}


                        </NativeSelect>







                        <FormHelperText>{errors?.category_id?.message}</FormHelperText>
                    </FormControl>








                    <Box mt="15px" textAlign="center"><Button type='submit' fullWidth variant="contained" sx={{
                        backgroundColor: myColor.greenDefault,
                        "&:hover": {
                            backgroundColor: myColor.greenDefault,
                        }
                    }} >
                        Cập Nhât Đơn Hàng


                    </Button></Box>

                </Box>



            </Box>
        </form >
    );
}

export default FormUpdateOrder;