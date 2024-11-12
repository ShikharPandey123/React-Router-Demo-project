import { json } from "react-router-dom";

// utils/fetchEvent.js
export async function fetchEventById(id, method = "GET") {
    const response = await fetch(`http://localhost:8080/events/${id}`, {
      method,
    });
  
    if (!response.ok) {
      throw json({ message: "Could not fetch events." }, { status: 500 });
    }
  
    return response;
}
  