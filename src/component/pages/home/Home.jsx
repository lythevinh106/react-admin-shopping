import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { ButtonAddNew } from '../../CustomButton/CustomButton';
import { TypoTitleContent } from '../../CustomTypo/CustomTypo';
import PaginationTable from '../../PaginationTable/PaginationTable';
import { useDispatch, useSelector } from 'react-redux';
import { activeMenu } from '../../../features/progress/progressSlice';
import { fetchListOrder, removeOrder, setFilter, toggleCreateForm, toggleDeleteForm, toggleUpdateForm, updateOrder } from '../../../features/order/orderSlice';
import ProductTable from '../../ProductTable/ProductTable';
import InputSearch from '../../InputSearch/InputSearch';


import FilterCategory from '../../FilterCategory/FilterCategory'
import FilterStatusOrder from '../../FilterStatusOrder/FilterStatusOrder';
import FilterSelect from '../../FilterSelect/FilterSelect';
import DrawerMainProduct from '../../DrawerComp/DrawerMainProduct';
import DrawerCreate from '../../DrawerComp/DrawerCreate/DrawerCreate';
import DrawerMain from '../../DrawerComp/DrawerMain';
import FormUpdateOrder from '../../Form/FormUpdateOrder/FormUpdateOrder';
import { useSnackbar } from 'notistack';
import ModalMain from '../../ModalComp/ModalMain';
import ModalRemove from '../../ModalComp/ModalRemove/ModalRemove';


Home.propTypes = {

};




function Home(props) {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const listOrder = useSelector((state) => state.order.listOrder)
    const infoPaginate = useSelector((state) => state.order.infoPaginate)

    const filter = useSelector((state) => state.order.filter)





    const isOpenUpdateForm = useSelector(state => state.order.isOpenUpdateForm);
    const isOpenDeleteForm = useSelector(state => state.order.isOpenDeleteForm);



    useEffect(() => {

        (async () => {
            const response = await dispatch(fetchListOrder(filter))
            // console.log(response);
        })();


    }, [filter, isOpenDeleteForm])


    // console.log(listOrder);




    const handleChangePage = (e, value) => {
        dispatch(setFilter({
            ...filter,
            page: value

        }))
    }


    const handleSearch = (e) => {


        // console.log(e.target.value.trim().length);
        if (e.target.value.trim().length <= 0) {
            dispatch(setFilter({
                search: ""
            }))
            return;


        }

        else {
            dispatch(setFilter({
                search: e.target.value
            }))
        }


    }


    const handleFilterStatusChange = (value) => {

        dispatch(setFilter({
            status: value
        }))
    }


    const handleSortChange = (value) => {
        dispatch(setFilter({
            sort: value
        }))


    }

    const handleCloseDrawer = () => {

        dispatch(toggleUpdateForm(-1))
        dispatch(toggleDeleteForm(-1))
    }



    const onChangeStatusSubmit = async (data) => {
        dispatch(activeMenu(true))



        try {
            const response = await dispatch(updateOrder(data));
            // console.log(response);
            if (response.payload.original.status == 200) {
                enqueueSnackbar('C???p Nh???t ????n H??ng Th??nh C??ng.', { variant: "success" });
                dispatch(activeMenu(false))

            }
            else {
                enqueueSnackbar('C???p Nh???t ????n H??ng Th???t B???i.', { variant: "success" });
                dispatch(activeMenu(false))
            }

            // console.log(response);
        } catch (error) {
            enqueueSnackbar('C???p Nh???t ????n H??ng Th???t B???i.', { variant: "success" });
            dispatch(activeMenu(false))

        }



    }

    const handleOnYesRemove = async (id) => {

        dispatch(activeMenu(true))

        try {
            const response = await dispatch(removeOrder(id));
            console.log(response);
            if (response.payload.status == 201) {
                enqueueSnackbar('X??a ????n H??ng Th??nh C??ng.', { variant: "success" });
                dispatch(activeMenu(false))
                dispatch(toggleDeleteForm(-1))
            }
            else {
                enqueueSnackbar('X??a ????n H??ng Th???t B???i.', { variant: "success" });
                dispatch(activeMenu(false))
            }

            // console.log(response);
        } catch (error) {
            enqueueSnackbar('X??a ????n H??ng Th???t B???i.', { variant: "success" });
            dispatch(activeMenu(false))

        }

    }

    const handleOnNoRemove = () => {
        dispatch(toggleDeleteForm(-1))

    }




    return (
        <div>
            <Box className="dashboard-wrapper" >




                <Box>


                    <TypoTitleContent>Qu???n L?? ????n H??ng</TypoTitleContent>


                    <Box

                        sx={{
                            margin: "10px 0px",
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >





                    </Box>

                    <Box

                        sx={{
                            margin: "10px 0px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >


                        <Box>
                            <InputSearch onChange={handleSearch} title="T??m theo m?? v???n ????n" />
                        </Box>

                        <Box sx={{ width: "200px" }}>

                            {/* <FilterCategory onFilterCatChange={handleFilterStatusChange} /> */}

                            <FilterStatusOrder onFilterStatusChange={handleFilterStatusChange} />
                        </Box>
                        <Box sx={{ width: "200px" }}>
                            <FilterSelect onSortChange={handleSortChange} />
                        </Box>



                    </Box>
                    <Box mt="20px">
                        <ProductTable type="order" data={listOrder} cols={

                            [

                                { title: "M?? ????n H??ng", field: "order_token" },
                                { title: "Tr???ng Th??i", field: "status" },
                                { title: "T??n Kh??ch", field: "name" },


                            ]
                        } />
                    </Box>



                </Box>

                <Box sx={{

                }}>


                    <PaginationTable sx={{
                        "marginTop": "25px",
                        display: "flex",
                        justifyContent: "flex-end"



                    }}

                        count={infoPaginate.totalPage}
                        page={infoPaginate.currentPage}

                        onChange={handleChangePage}
                    />

                </Box>





                <DrawerMain isDrawer={isOpenUpdateForm >= 1 ? true : false} setIsDrawer={handleCloseDrawer}
                    component={isOpenUpdateForm >= 1 ? <FormUpdateOrder orderUpdate={listOrder.find(e => e.id == isOpenUpdateForm)} onSubmit={onChangeStatusSubmit} /> : ""} />



                {/* <DrawerMain isDrawer={isOpenDeleteForm >= 1 ? true : false} setIsDrawer={handleCloseDrawer}
                    component={isOpenDeleteForm >= 1 ? <h1> form delete</h1> : ""} /> */}


                {isOpenDeleteForm >= 1 && <ModalMain
                    component={<ModalRemove
                        onYEsRemove={() =>
                            handleOnYesRemove(isOpenDeleteForm)
                        }
                        onNoRemove={handleOnNoRemove}
                    />}
                    oncloseRemoveBtn={() => {
                        dispatch(toggleDeleteForm(-1))
                    }} />
                }




            </Box>
        </div>
    );
}

export default Home;