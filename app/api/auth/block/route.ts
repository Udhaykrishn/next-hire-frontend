import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const cookie = request.headers.get("cookie");

  console.log(`API check: block status for role=${role}`);

  // For block check, we can just hit the profile endpoint
  // and check the status field.
  let endpoint = "/user/profile";
  if (role === "recruiter") {
    endpoint = "/recruiter/profile";
  } else if (role === "admin") {
    // Admins are never blocked in this system, skip profile fetch
    return NextResponse.json({ blocked: false });
  }

  try {
    const response = await axios.get(`${BACKEND_URL}${endpoint}`, {
      headers: { cookie: cookie || "" },
      withCredentials: true,
    });

    const user = response.data;
    const isBlocked = user.status === "Blocked";

    return NextResponse.json({ blocked: isBlocked });
  } catch (error) {
    const axiosError = error as {
      response?: {
        status?: number;
        data?: { message?: string; error?: { message?: string } };
      };
    };
    if (
      axiosError.response?.status === 403 ||
      axiosError.response?.data?.message?.toLowerCase().includes("blocked") ||
      axiosError.response?.data?.error?.message
        ?.toLowerCase()
        .includes("blocked")
    ) {
      return NextResponse.json({ blocked: true });
    }
    return NextResponse.json({ blocked: false });
  }
}
