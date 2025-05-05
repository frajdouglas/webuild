import axios from "axios";

export async function getCalendar() {
  try {
    const response = await axios.get("https://reimagined-giggle-xqr6pxwq4v9hr7j-3000.app.github.dev/calendar/availability"); 
    console.log("Calendar data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    throw error;
  }
}