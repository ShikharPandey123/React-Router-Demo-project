import { NavLink, useRouteLoaderData } from "react-router-dom";

function EventsNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header className="bg-peach-400 bg-opacity-30 shadow-lg py-4">
      <nav className="max-w-5xl mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `text-lg font-semibold px-4 py-2 rounded-lg transition-transform transform ${
                  isActive
                    ? "text-white underline underline-offset-4"
                    : "text-white hover:text-peach-300 hover:scale-105"
                }`
              }
              end
            >
              All Events
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) =>
                  `text-lg font-semibold px-4 py-2 rounded-lg transition-transform transform ${
                    isActive
                      ? "text-white underline underline-offset-4"
                      : "text-white hover:text-peach-300 hover:scale-105"
                  }`
                }
              >
                New Event
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
