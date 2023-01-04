import { configureStore } from '@reduxjs/toolkit'
import progressSlice from '../features/progress/progressSlice'

export const store = configureStore({
    reducer: {
        progress: progressSlice
    },
})