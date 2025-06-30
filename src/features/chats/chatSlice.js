import { createSlice } from '@reduxjs/toolkit';

// ---------------- local storage -----------------

const getLocalStorage = JSON.parse(localStorage.getItem('messages'))

const setLocalStorage = (messages) =>{
   localStorage.setItem('messages', JSON.stringify(messages))
  }

// ------------ initial state ----------------

const initialState = {
  messages: getLocalStorage || [],
};

// ------------- chat slice ----------------

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      setLocalStorage(state.messages)
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
