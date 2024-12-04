import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  toggleTask,
  deleteTask,
  setFilter,
  setSearchQuery,
  setPriority,
  reorderTasks,
  addTask,
  editTask,
  openDeleteModal,
  closeDeleteModal,
} from "../store/tasksSlice";
import ConfirmDialog from "../components/ConfirmDialog";
import TaskFormModal from "./TaskFormModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskStats from "../components/TaskStats";

const TasksPage = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery, showDeleteModal, taskToDelete } =
    useSelector((state) => state.tasks);

  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const overdueTasks = tasks.filter(
      (task) => new Date(task.dueDate) < new Date() && !task.completed
    );
    if (overdueTasks.length) {
      toast.warning(`${overdueTasks.length} overdue task(s) detected!`);
    }
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
    if (filter === "Completed" && !task.completed) return false;
    if (filter === "Pending" && task.completed) return false;
    if (filter === "Overdue" && !isOverdue) return false;
    if (filter === "High" && task.priority !== "High") return false;
    if (filter === "Medium" && task.priority !== "Medium") return false;
    if (filter === "Low" && task.priority !== "Low") return false;
    if (!task.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  const handleTaskCompletion = (taskId) => {
    dispatch(toggleTask(taskId));
    toast.success("Task status toggled!");
  };

  const handleDelete = (e, taskId) => {
    e.stopPropagation();
    dispatch(openDeleteModal(taskId));
  };

  const confirmDelete = () => {
    dispatch(deleteTask());
    toast.info("Task deleted!");
  };

  const handleAddTask = () => {
    setTaskToEdit(null);
    setModalOpen(true);
  };

  const handleEditTask = (e, task) => {
    e.stopPropagation();
    setTaskToEdit(task);
    setModalOpen(true);
  };

  const handleFormSubmit = (taskData) => {
    if (taskToEdit) {
      dispatch(editTask(taskData));
      toast.success("Task updated successfully!");
    } else {
      dispatch(addTask(taskData));
      toast.success("Task added successfully!");
    }
    setModalOpen(false);
  };

  return (
    <div
      className="max-w-5xl mt-16 mx-auto p-8 rounded-lg shadow-xl text-white"
      style={{
        backgroundImage: "url('/image4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <h1 className="text-4xl font-bold text-black text-center mb-8">
        Task Manager Dashboard
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          className="flex-grow p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
        <div className="flex gap-2">
          {[
            "All",
            "Completed",
            "Pending",
            "Overdue",
            "High",
            "Medium",
            "Low",
          ].map((filterType) => (
            <button
              key={filterType}
              onClick={() => dispatch(setFilter(filterType))}
              className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 focus:outline-none transform hover:scale-105 active:scale-95 transition-transform"
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddTask}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform hover:scale-105 active:scale-95 transition-transform"
      >
        Add Task
      </button>

      <TaskStats />

      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) return;

          const reorderedTasks = Array.from(tasks);
          const [movedTask] = reorderedTasks.splice(source.index, 1);
          reorderedTasks.splice(destination.index, 0, movedTask);
          dispatch(reorderTasks(reorderedTasks));
        }}
      >
        <Droppable droppableId="task-list">
          {(provided) => (
            <ul
              className="space-y-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105 cursor-pointer"
                      onClick={() => handleTaskCompletion(task.id)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold">
                          {task.title}
                        </span>
                        <span className="text-sm text-gray-400">
                          {task.dueDate} - {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => handleEditTask(e, task)}
                          className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transform hover:scale-105 active:scale-95 transition-transform"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, task.id)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transform hover:scale-105 active:scale-95 transition-transform"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <ConfirmDialog
        open={showDeleteModal}
        onClose={() => dispatch(closeDeleteModal())}
        onConfirm={confirmDelete}
        title="Confirm Task Deletion"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
      <TaskFormModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        task={taskToEdit}
      />

      <ToastContainer />
    </div>
  );
};

export default TasksPage;
