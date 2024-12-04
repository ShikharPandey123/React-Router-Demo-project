// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   tasks: [
//     { id: 1, title: "Learn Redux", completed: false, dueDate: "2024-12-05" },
//     { id: 2, title: "Build a project", completed: true, dueDate: "2024-12-01" },
//   ],
//   filter: "All",
//   searchQuery: "",
//   showDeleteModal: false,
//   taskToDelete: null,
// };

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       state.tasks.push(action.payload);
//     },
//     toggleTask: (state, action) => {
//       const task = state.tasks.find((t) => t.id === action.payload);
//       if (task) task.completed = !task.completed;
//     },
//     deleteTask: (state) => {
//       state.tasks = state.tasks.filter(
//         (task) => task.id !== state.taskToDelete
//       );
//       state.taskToDelete = null;
//       state.showDeleteModal = false;
//     },
//     setFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     openDeleteModal: (state, action) => {
//       state.taskToDelete = action.payload;
//       state.showDeleteModal = true;
//     },
//     closeDeleteModal: (state) => {
//       state.taskToDelete = null;
//       state.showDeleteModal = false;
//     },
//     reorderTasks: (state, action) => {
//       state.tasks = action.payload;
//     },
//     setPriority: (state, action) => {
//       const { id, priority } = action.payload;
//       const task = state.tasks.find((t) => t.id === id);
//       if (task) task.priority = priority;
//     },
//   },
// });

// export const {
//   addTask,
//   toggleTask,
//   deleteTask,
//   setFilter,
//   setSearchQuery,
//   openDeleteModal,
//   closeDeleteModal,
//   reorderTasks,
//   setPriority,
// } = tasksSlice.actions;

// export default tasksSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Learn Redux",
      completed: false,
      dueDate: "2024-12-05",
      priority: "Medium",
    },
    {
      id: 2,
      title: "Build a project",
      completed: true,
      dueDate: "2024-12-01",
      priority: "High",
    },
  ],
  filter: "All",
  searchQuery: "",
  showDeleteModal: false,
  taskToDelete: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: state.tasks.length ? state.tasks[state.tasks.length - 1].id + 1 : 1, // Auto-generate ID
      };
      state.tasks.push(newTask);
    },

    // Edit an existing task
    editTask: (state, action) => {
      const { id, title, completed, dueDate, priority } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.completed = completed;
        task.dueDate = dueDate;
        task.priority = priority;
      }
    },

    // Toggle task completion
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },

    // Delete a task
    deleteTask: (state) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== state.taskToDelete
      );
      state.taskToDelete = null;
      state.showDeleteModal = false;
    },

    // Set filter type
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Open delete confirmation modal
    openDeleteModal: (state, action) => {
      state.taskToDelete = action.payload;
      state.showDeleteModal = true;
    },

    // Close delete confirmation modal
    closeDeleteModal: (state) => {
      state.taskToDelete = null;
      state.showDeleteModal = false;
    },

    // Reorder tasks (e.g., drag and drop)
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
    },

    // Set task priority
    setPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.priority = priority;
    },
  },
});

export const {
  addTask,
  editTask,
  toggleTask,
  deleteTask,
  setFilter,
  setSearchQuery,
  openDeleteModal,
  closeDeleteModal,
  reorderTasks,
  setPriority,
} = tasksSlice.actions;

export default tasksSlice.reducer;
