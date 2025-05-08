import axios from "axios";

export async function postEvent(eventData: {
  name: string;
  email: string;
  meetingStartTime: Date;
  extraDetails?: string;
}) {
  try {
    const response = await axios.post(
      // "https://reimagined-giggle-xqr6pxwq4v9hr7j-3000.app.github.dev/calendar/event",
      "https://calendarbook.onrender.com/calendar/event",
      eventData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}