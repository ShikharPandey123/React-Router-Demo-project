import { useSelector } from "react-redux";

const TaskStats = () => {
  const { tasks } = useSelector((state) => state.tasks);

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && !task.completed
  ).length;

  const weeklyProgress = calculateWeeklyProgress(tasks);

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-900 p-6 rounded-lg shadow-lg mb-8">
      <div className="text-center p-4 bg-purple-700 rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h3 className="text-lg font-bold text-purple-200">Total Tasks</h3>
        <p className="text-3xl font-semibold text-purple-100">{totalTasks}</p>
      </div>
      <div className="text-center p-4 bg-green-700 rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h3 className="text-lg font-bold text-green-200">Completed</h3>
        <p className="text-3xl font-semibold text-green-100">
          {completedTasks}
        </p>
      </div>
      <div className="text-center p-4 bg-yellow-700 rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h3 className="text-lg font-bold text-yellow-200">Pending</h3>
        <p className="text-3xl font-semibold text-yellow-100">{pendingTasks}</p>
      </div>
      <div className="text-center p-4 bg-red-700 rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h3 className="text-lg font-bold text-red-200">Overdue</h3>
        <p className="text-3xl font-semibold text-red-100">{overdueTasks}</p>
      </div>
    </div>
  );
};

const calculateWeeklyProgress = (tasks) => {
  const currentDate = new Date();
  const weekStartDate = new Date(
    currentDate.setDate(currentDate.getDate() - 7)
  );
  const recentTasks = tasks.filter(
    (task) => new Date(task.dueDate) >= weekStartDate
  );
  const completedInLastWeek = recentTasks.filter(
    (task) => task.completed
  ).length;
  return Math.round((completedInLastWeek / recentTasks.length) * 100) || 0;
};

export default TaskStats;
