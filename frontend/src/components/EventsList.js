import { Link } from "react-router-dom";

function EventsList({ events }) {
  return (
    <div className="max-w-5xl mx-auto mt-16 p-6">
      <div
        className="bg-peach-400 bg-opacity-30 rounded-lg shadow-xl p-6 text-white"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          All Events
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <li
              key={event.id}
              className="bg-gray-800 bg-opacity-80 rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-transform"
              style={{
                backdropFilter: "blur(8px)",
              }}
            >
              <Link to={`/events/${event.id}`} className="block">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-peach-100 mb-2">
                    {event.title}
                  </h2>
                  <time className="text-gray-300">{event.date}</time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventsList;
