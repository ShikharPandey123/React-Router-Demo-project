import React, { useState, useEffect } from "react";

const TaskFormModal = ({ open, onClose, onSubmit, task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [difficulty, setDifficulty] = useState("Low");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setDifficulty(task.difficulty || "Low");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setDifficulty("Low");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...task, title, description, dueDate, difficulty });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F9E2C0] p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-lg font-bold text-[#F28D35] mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-[#F28D35]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-[#F28D35]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-[#F28D35]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="block w-full bg-white border border-gray-300 text-gray-800 rounded-lg p-2 focus:ring-2 focus:ring-[#F28D35]"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#F28D35] text-white rounded-lg hover:bg-[#F8A04D]"
            >
              {task ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;