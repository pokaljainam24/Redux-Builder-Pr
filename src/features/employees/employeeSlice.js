import { createSlice } from "@reduxjs/toolkit";

// ---------------- local storage -----------------

const getLocalStorage = JSON.parse(localStorage.getItem('employees'))

const setLocalStorage = (employees) =>{
   localStorage.setItem('employees', JSON.stringify(employees))
  }

// -------------- initial state -----------------

const initialState = {
  employees: getLocalStorage || [],
  editData: {},
};

// --------------- employee Slice ----------------

 const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // ---------- create employee ----------

    createUser: (state, action) => {
      state.employees.push(action.payload);
      setLocalStorage(state.employees);
    },

    // ---------- delete employee ----------

    deleteUser: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );

      setLocalStorage(state.employees);
    },

    // ---------- edit employee ----------

    editUser : (state, action) =>{
        const id = action.payload
        const editDatas = state.employees.find(emp => emp.id === id)
        state.editData = editDatas || {}
    },

    // ---------- update employee ----------

    updateUser : (state, action) =>{
        const updatedData = action.payload
        const index = state.employees.findIndex(emp => emp.id === updatedData.id)
        
        if(index !== -1){
            state.employees[index] = updatedData
            setLocalStorage(state.employees);
        }

        state.editData = {};
    }
    
  },
});

export const { createUser, deleteUser, updateUser, editUser } = employeeSlice.actions;
export default employeeSlice.reducer;
