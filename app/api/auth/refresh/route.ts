import axios from "axios";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/constants/routes";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export async function POST(request: NextRequest) {
  if (!request.cookies.has(COOKIE_NAMES.sid)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

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
  } catch (error) {
    const axiosError = error as {
      message?: string;
      response?: {
        status?: number;
        data?: { message?: string; error?: { message?: string } };
      };
    };
    console.error(`Refresh failed for role ${role}:`, axiosError.message);
    const isBlocked =
      axiosError.response?.status === 403 ||
      axiosError.response?.data?.message?.toLowerCase().includes("blocked") ||
      axiosError.response?.data?.error?.message
        ?.toLowerCase()
        .includes("blocked");

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
