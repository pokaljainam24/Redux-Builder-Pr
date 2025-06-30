import { createSlice } from "@reduxjs/toolkit";

// ---------------- local storage -----------------

const getLocalStorage = JSON.parse(localStorage.getItem("tasks"));

const setLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// ------------ initial state -----------------

const initialState = {
  tasks: getLocalStorage || [],
  editTaskObj: {},
};

// -------------- tasks slice ----------------

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    // ---------- add tasks -------------

    addTask: (state, action) => {
      state.tasks.push(action.payload);
      setLocalStorage(state.tasks);
    },

    // --------- delete tasks -------------

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      setLocalStorage(state.tasks);
    },

    // ---------- edit tasks ----------

    editTask: (state, action) => {
      const id = action.payload;
      const editTasks = state.tasks.find((task) => task.id === id);
      state.editTaskObj = editTasks || {};
    },

    // ---------- update tasks ----------

    updateTask: (state, action) => {
      const updatedData = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedData.id);

      if (index !== -1) {
        state.tasks[index] = updatedData;
        setLocalStorage(state.tasks);
      }

      state.editTaskObj = {};
    },

    // ---------- mark task as done ----------

    markTaskAsDone: (state, action) => {
      const id = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);

      if (index !== -1) {
        state.tasks[index].isDone = true;
        setLocalStorage(state.tasks);
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, editTask, markTaskAsDone } = tasksSlice.actions;
export default tasksSlice.reducer;
