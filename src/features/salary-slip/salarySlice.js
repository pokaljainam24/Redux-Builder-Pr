import { createSlice } from "@reduxjs/toolkit";

// ---------------- local storage ------------------

const getLocalStorage = JSON.parse(localStorage.getItem('salarySlip'))

const setLocalStorage = (salarySlip) =>{
   localStorage.setItem('salarySlip', JSON.stringify(salarySlip))
  }


// ------------- initail state -------------

const initialState = {
    salaryArr : getLocalStorage || []
}

const salarySlice = createSlice({
    name:'salary',
    initialState,
    reducers:{
        addSalary:(state,action)=>{
            state.salaryArr.push(action.payload)
            setLocalStorage(state.salaryArr)
        },

        deleteSalary : (state,action) =>{
            state.salaryArr = state.salaryArr.filter(item => item.id !== action.payload)
            setLocalStorage(state.salaryArr)
        }
        
    }
})

export const {addSalary, deleteSalary} = salarySlice.actions
export default salarySlice.reducer;