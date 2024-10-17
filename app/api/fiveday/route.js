import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    // Create a URL object to access searchParams
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const searchParams = url.searchParams;

    // Get the latitude and longitude from the query string
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // If lat or lon are missing, handle the error
    if (!lat || !lon) {
      return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 });
    }

    // Construct the URL for the OpenWeatherMap API
    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch the data from OpenWeatherMap API
    const dailyRes = await fetch(dailyUrl, {
      next: { revalidate: 3600 },
    });

    const dailyData = await dailyRes.json();

    return NextResponse.json(dailyData);
  } catch (error) {
    console.log("Error in getting daily data:", error);
    return new Response("Error in getting daily data", { status: 500 });
  }
}
