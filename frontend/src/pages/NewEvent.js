import EventForm from "../components/EventForm";

export default function NewEvent() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: 'url("/image6.jpg")',
      }}
    >
      <EventForm method="post" />
    </div>
  );
}
