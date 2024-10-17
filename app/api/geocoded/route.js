import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Create a URL object to access searchParams
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const searchParams = url.searchParams;

    // Get the city name from the query string
    const city = searchParams.get("search");

    // If the city parameter is missing, handle the error
    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    // Construct the URL for the OpenWeatherMap API
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    // Fetch the data from the OpenWeatherMap API using axios
    const res = await axios.get(apiUrl);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching geocoded data:", error);
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
