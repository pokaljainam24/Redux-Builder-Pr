import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem('userAuth'))

const initialState = storedUser || {

    role: '',
    isLoggedIn : false 

}

const authSlice = createSlice({

    name: 'Authentication',
    initialState,
    reducers: {

        // -------- login user --------
        
        loginUser : (state, action) => {

            state.role = action.payload.role;
            state.isLoggedIn = true;

            localStorage.setItem('userAuth', JSON.stringify(state));

        },

        // -------- logout user --------

        logoutUser: (state) => {

            state.role = '';
            state.isLoggedIn = false;

            localStorage.removeItem('userAuth')

        }

    }

})

export const {loginUser, logoutUser} = authSlice.actions
export default  authSlice.reducer;