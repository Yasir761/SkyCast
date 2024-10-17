import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Create a URL object to access searchParams
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const searchParams = url.searchParams;

    // Get the latitude and longitude from the query string
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // If lat or lon is missing, return an error response
    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude and Longitude are required" }, { status: 400 });
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Construct the URL for the OpenWeatherMap Air Pollution API
    const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch the air pollution data using axios
    const res = await axios.get(apiUrl);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching pollution data: ", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
