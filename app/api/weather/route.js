import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Create a URL object to access searchParams
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const searchParams = url.searchParams;

    // Get latitude and longitude from query string
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // If lat or lon is missing, return an error response
    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude and Longitude are required" }, { status: 400 });
    }

    // Construct the OpenWeather API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch data using axios
    const res = await axios.get(apiUrl);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching forecast data", error);
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
