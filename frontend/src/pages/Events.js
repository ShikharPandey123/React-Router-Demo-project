import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: "url('/image2.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 flex-grow flex items-center justify-center">
        <Suspense
          fallback={<p className="text-center text-white">Loading...</p>}
        >
          <Await resolve={events}>
            {(loadedEvents) => <EventsList events={loadedEvents} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch(
    "https://react-router-demo-project.onrender.com/events"
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}