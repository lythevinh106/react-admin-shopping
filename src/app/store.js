import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '../features/order/orderSlice'
import progressSlice from '../features/progress/progressSlice'

export const store = configureStore({
    reducer: {
        progress: progressSlice,
        order: orderSlice
    },
})