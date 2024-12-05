import React, { useState } from "react";
import { NavLink, Form, useRouteLoaderData } from "react-router-dom";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-peach-400 text-white shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo or brand */}
        <div className="text-xl font-bold">Event Management App</div>

        {/* Hamburger Icon */}
        <button
          className="block sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="space-y-1">
            <div
              className={`h-1 w-6 bg-white transform transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-white transition-opacity ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-white transform transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </div>
        </button>

        {/* Navigation Links */}
        <ul
          className={`fixed sm:static top-0 right-0 sm:flex sm:items-center sm:space-x-10 sm:translate-x-0 bg-peach-400 sm:bg-transparent shadow-md sm:shadow-none h-auto w-auto sm:w-auto p-4 sm:p-0 space-y-4 sm:space-y-0 text-lg transition-transform duration-500 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Links */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "hover:text-gray-300"
              }
              end
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "hover:text-gray-300"
              }
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "hover:text-gray-300"
              }
              onClick={() => setMenuOpen(false)} // Close menu on click
            >
              Tasks
            </NavLink>
          </li>
          {!token ? (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold border-b-2 border-white"
                    : "hover:text-gray-300"
                }
                onClick={() => setMenuOpen(false)} // Close menu on click
              >
                Authentication
              </NavLink>
            </li>
          ) : (
            <li>
              <Form
                action="/logout"
                method="post"
                onClick={() => setMenuOpen(false)}
              >
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                  Logout
                </button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
