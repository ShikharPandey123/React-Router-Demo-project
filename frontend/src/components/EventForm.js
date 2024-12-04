import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import { getAuthToken } from "../util/auth";

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-[#F9E2C0] text-white p-8 rounded-lg shadow-lg">
      {" "}
      <Form method={method} className="space-y-6">
        {data && data.errors && (
          <ul className="text-red-500 list-disc list-inside">
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#F28D35] mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={event ? event.title : ""}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-[#F28D35] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-[#F28D35] mb-1"
          >
            Image (URL)
          </label>
          <input
            id="image"
            type="url"
            name="image"
            required
            defaultValue={event ? event.image : ""}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-[#F28D35] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-[#F28D35] mb-1"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            required
            defaultValue={event ? event.date : ""}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-[#F28D35] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#F28D35] mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={event ? event.description : ""}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-[#F28D35] focus:outline-none"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={cancelHandler}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-semibold ${
              isSubmitting
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#F28D35] hover:bg-[#F8A04D] text-white"
            }`}
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-semibold ${
              isSubmitting
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#F28D35] hover:bg-[#F8A04D] text-white"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "https://react-router-demo-project.onrender.com/events";

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = "https://react-router-demo-project.onrender.com/events/" + eventId;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/events");
}
