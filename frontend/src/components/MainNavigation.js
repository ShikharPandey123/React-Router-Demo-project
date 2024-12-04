import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header className="sticky top-0 bg-peach-400 text-white shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <ul className="flex space-x-10 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "hover:text-gray-300"
              }
              end
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
            >
              Tasks
            </NavLink>
          </li>
        </ul>

        <div className="ml-auto">
          {!token ? (
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "hover:text-gray-300"
              }
            >
              Authentication
            </NavLink>
          ) : (
            <Form action="/logout" method="post">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                Logout
              </button>
            </Form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
