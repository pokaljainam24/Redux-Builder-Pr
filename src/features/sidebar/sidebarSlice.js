import { createSlice } from '@reduxjs/toolkit';

 const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    open: true,
  },
  reducers: {
    toggleSidebar(state) {
      state.open = !state.open;
    },
    setSidebarOpen(state, action) {
      state.open = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen } = SidebarSlice.actions;

export default SidebarSlice.reducer;