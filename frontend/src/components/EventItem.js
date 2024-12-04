import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

function EventItem({ event }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-8">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>

      <time className="block text-gray-400 mb-4">{event.date}</time>

      <p className="text-gray-300 mb-6">{event.description}</p>

      {token && (
        <menu className="flex justify-between items-center">
          <Link
            to="edit"
            className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Edit
          </Link>
          <button
            onClick={startDeleteHandler}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Delete
          </button>
        </menu>
      )}
    </article>
  );
}

export default EventItem;
