import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selectedEmployee: null
}

const salaryModalSlice = createSlice({
    name:"salaryModal",
    initialState,
    reducers:{

            // ------------ open modal ---------------

            openSalaryModal:(state,action) =>{
                state.isOpen = true;
                state.selectedEmployee = action.payload
            },

            // ---------- close modal ---------------

            closeSalaryModal:(state) => {
                state.isOpen = false;
                state.selectedEmployee = null
            }
    }

})

export const {openSalaryModal,closeSalaryModal} = salaryModalSlice.actions
export default salaryModalSlice.reducer 