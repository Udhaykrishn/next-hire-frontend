import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const cookie = request.headers.get("cookie");

  let endpoint = "";
  if (role === "admin") endpoint = "/auth/admin/refresh";
  else if (role === "recruiter") endpoint = "/auth/recruiter/refresh";
  else endpoint = "/auth/user/refresh";

  try {
    const requestConfig = {
      headers: { cookie: cookie || "" },
      withCredentials: true,
    };

    const response =
      role === "admin"
        ? await axios.get(`${BACKEND_URL}${endpoint}`, requestConfig)
        : await axios.post(`${BACKEND_URL}${endpoint}`, {}, requestConfig);

    const res = NextResponse.json({ success: true });

    // Copy set-cookie headers from backend response to our response
    const setCookie = response.headers["set-cookie"];
    if (setCookie) {
      setCookie.forEach((cookieStr) => {
        res.headers.append("Set-Cookie", cookieStr);
      });
    }

    return res;
  } catch (error: any) {
    console.error(`Refresh failed for role ${role}:`, error.message);
    const isBlocked =
      error.response?.status === 403 ||
      error.response?.data?.message?.toLowerCase().includes("blocked") ||
      error.response?.data?.error?.message?.toLowerCase().includes("blocked");

    if (isBlocked) {
      return NextResponse.json(
        { success: false, blocked: true },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { success: false, blocked: false },
      { status: 401 },
    );
  }
}
