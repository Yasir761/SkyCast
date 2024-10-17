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

    // Construct the Open-Meteo API URL
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    // Fetch the UV index data with a cache revalidation time of 900 seconds
    const res = await fetch(apiUrl, {
      next: { revalidate: 900 },
    });

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.log("Error Getting Uv Data", error);

    return new Response("Error getting Uv Data", { status: 500 });
  }
}
