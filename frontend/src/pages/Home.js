import { NavLink } from "react-router-dom";
import PageContent from "../components/PageContent";

export default function Home() {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image.jpg')" }}
    >
      <div
        className="animate-fade-in bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-8 text-center text-white max-w-lg mx-auto"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Your Productivity Dashboard!
        </h1>
        <p className="text-lg mb-6">
          Seamlessly manage your tasks and stay on top of your events.
        </p>
        <p className="text-md mb-8">
          Whether it’s organizing your to-dos or planning for upcoming events,
          we’ve got you covered.
        </p>
        <div className="flex justify-center space-x-4">
          <NavLink
            to="/events"
            className="px-6 py-3 bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
          >
            Explore Events
          </NavLink>
          <NavLink
            to="/tasks"
            className="px-6 py-3 bg-teal-500 rounded-md shadow-md hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
          >
            Manage Tasks
          </NavLink>
        </div>
      </div>
    </div>
  );
}
