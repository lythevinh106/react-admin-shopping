import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import OrderApi from '../../ApiServices/OrderApi'




export const fetchListOrder = createAsyncThunk(
    'order/fetchListOrder',
    // Declare the type your function argument here:
    async (filter) => {
        try {

            const response = OrderApi.getListOrder(filter);

            return response

        } catch (error) {

        }

    }
)

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    // Declare the type your function argument here:
    async (data) => {
        try {

            const response = OrderApi.updateStatusOrder(data);

            return response

        } catch (error) {

        }

    }
)


export const removeOrder = createAsyncThunk(
    'order/removeOrder',
    // Declare the type your function argument here:
    async (id) => {
        try {

            const response = await OrderApi.removeOrder(id);
            // console.log(response);
            return response

        } catch (error) {

        }

    }
)



export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        listOrder: [],
        filter: {
            limit: 5,
            page: 1
        },

        infoPaginate: {
            totalPage: 1,
            totalItem: 1,
            currentPage: 1
        },


        isOpenUpdateForm: -1,
        isOpenDeleteForm: -1


    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = {
                ...state.filter,
                ...action.payload
            }
        }

        ,



        toggleUpdateForm: (state, action) => {

            if (action.payload >= 1) {
                state.isOpenUpdateForm = action.payload
            }
            else {
                state.isOpenUpdateForm = -1
            }


        }
        ,

        toggleDeleteForm: (state, action) => {
            // console.log(action.payload);
            // return;
            if (action.payload >= 1) {
                state.isOpenDeleteForm = action.payload
            }
            else {
                state.isOpenDeleteForm = -1
            }


        }
        ,


    },

    extraReducers: (builder) => {



        builder.addCase(fetchListOrder.fulfilled, (state, action) => {

            // console.log(action.payload);

            const newData = action.payload.data.map(element => {

                delete element?.user?.id;
                delete element?.customer?.id;
                return {
                    ...element,
                    ...element?.user,
                    ...element?.customer,

                }
            });


            state.listOrder = newData;
            state.infoPaginate.totalPage = action.payload.last_page;
            state.infoPaginate.totalItem = action.payload.total;
            state.infoPaginate.currentPage = action.payload.current_page;
        })


        builder.addCase(updateOrder.fulfilled, (state, action) => {

            let orderId = action.payload.original.data.order_id;
            let status = action.payload.original.data.status;


            const findIndex = state.listOrder.findIndex(val => val.id == orderId);


            // console.log(findIndex);

            state.listOrder[findIndex] = {
                ...state.listOrder[findIndex],
                status: status

            }

        })

        builder.addCase(removeOrder.fulfilled, (state, action) => {

            let orderId = action.payload.data.order_id;



            const findIndex = state.listOrder.findIndex(val => val.id == orderId);


            // console.log(findIndex);

            state.listOrder.splice(findIndex, 1);

        })



    },





})

// Action creators are generated for each case reducer function
export const { setFilter, toggleCreateForm, toggleUpdateForm, toggleDeleteForm } = orderSlice.actions

export default orderSlice.reducer