import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    isOpen: false,
    employee: null

}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        // -------------- open modal ---------------

        openModal : (state, action) =>{
            state.isOpen = true
            state.employee = action.payload
        },

        // -------------- close modal ---------------

        closeModal : (state) =>{
            state.isOpen = false
            state.employee = null
        }

    }
})

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;