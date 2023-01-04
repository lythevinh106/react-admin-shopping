import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    active: false,
}

export const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {



        activeMenu: (state, action) => {
            state.active = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { activeMenu } = progressSlice.actions

export default progressSlice.reducer