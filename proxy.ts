import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/constants/routes";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.at);
  const sessionId = request.cookies.get(COOKIE_NAMES.sid);
  const { pathname } = request.nextUrl;

  console.log("middleware working →", pathname);

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  if (pathname === "/recruiter") {
    return NextResponse.redirect(new URL("/recruiter/dashboard", request.url));
  }

  const prefixMap: Record<string, string> = {
    "/profile": "user",
    "/admin": "admin",
    "/recruiter": "recruiter",
  };

  let inferredPrefix: string | null = null;
  for (const prefix of Object.keys(prefixMap)) {
    if (pathname.startsWith(prefix)) {
      inferredPrefix = prefix;
      break;
    }
  }

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.endsWith("/login") ||
    pathname.endsWith("/signup") ||
    pathname.includes("/forgot-password") ||
    pathname.includes("/reset-password") ||
    pathname.includes("/onboarding"); // Recruiter onboarding is also semi-auth

  const getDashboardUrl = (prefix: string | null) => {
    if (prefix === "/admin") return new URL("/admin/dashboard", request.url);
    if (prefix === "/recruiter")
      return new URL("/recruiter/dashboard", request.url);
    return new URL("/profile", request.url);
  };

  const getLoginUrl = (prefix: string | null) => {
    if (prefix === "/admin") return new URL("/admin/login", request.url);
    if (prefix === "/recruiter")
      return new URL("/recruiter/login", request.url);
    return new URL("/login", request.url);
  };

  // 1. Unauthenticated Case
  if (!accessToken && !sessionId) {
    if (isAuthPage) return NextResponse.next();
    // Only redirect if it's a protected route
    if (inferredPrefix) {
      return NextResponse.redirect(getLoginUrl(inferredPrefix));
    }
    return NextResponse.next();
  }

  // 2. Access Token Present (Authenticated)
  if (accessToken) {
    if (isAuthPage) {
      // Don't redirect if it's a special case like forgot-password or reset-password
      if (
        pathname.includes("/forgot-password") ||
        pathname.includes("/reset-password")
      ) {
        return NextResponse.next();
      }
      return NextResponse.redirect(getDashboardUrl(inferredPrefix));
    }

    if (inferredPrefix) {
      const role = prefixMap[inferredPrefix];
      try {
        const checkBlock = await fetch(
          `${request.nextUrl.origin}/api/auth/block?role=${role}`,
          {
            headers: {
              cookie: request.headers.get("cookie") ?? "",
            },
          },
        );

        let isBlocked = false;

        if (!checkBlock.ok) {
          console.log(`Block check failed with status ${checkBlock.status}`);
          if (checkBlock.status === 403) {
             isBlocked = true;
          } else {
            return NextResponse.next();
          }
        } else {
          const data = await checkBlock.json();
          isBlocked = data.blocked;
        }

        if (isBlocked) {
          const loginUrl = getLoginUrl(inferredPrefix);
          loginUrl.searchParams.set("error", "blocked");
          const response = NextResponse.redirect(loginUrl);

          response.cookies.set(COOKIE_NAMES.at, "", {
            expires: new Date(0),
            path: "/",
          });
          response.cookies.set(COOKIE_NAMES.sid, "", {
            expires: new Date(0),
            path: "/",
          });

          return response;
        }
      } catch (error) {
        console.log("Error checking block status:", error);
      }
    }

    return NextResponse.next();
  }

  // 3. Session ID present but Access Token missing (Refresh Case)
  if (sessionId && inferredPrefix) {
    try {
      const refreshResponse = await fetch(
        `${request.nextUrl.origin}/api/auth/refresh?role=${prefixMap[inferredPrefix]}`,
        {
          method: "POST",
          headers: {
            cookie: request.headers.get("cookie") ?? "",
          },
        },
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();

        if (data.success) {
          if (isAuthPage) {
            return NextResponse.redirect(getDashboardUrl(inferredPrefix));
          }

          // Use NextResponse.next() — NOT redirect — so the browser stays on the
          // current page while the new accessToken cookie is applied inline.
          // A redirect re-runs the proxy before the cookie lands → infinite loop.
          const response = NextResponse.next();

          // Copy ALL Set-Cookie headers. getSetCookie() correctly handles multiple
          // separate cookies; fall back to splitting the raw combined header.
          const setCookieHeaders =
            typeof refreshResponse.headers.getSetCookie === "function"
              ? refreshResponse.headers.getSetCookie()
              : (refreshResponse.headers.get("set-cookie") ?? "")
                  .split(/,(?=[^;])/)
                  .map((s) => s.trim())
                  .filter(Boolean);

          for (const cookieStr of setCookieHeaders) {
            response.headers.append("Set-Cookie", cookieStr);
          }

          return response;
        }
      } else {
        // Handle 401/403 responses
        const data = await refreshResponse.json().catch(() => ({}));
        if (data.blocked) {
          const loginUrl = getLoginUrl(inferredPrefix);
          loginUrl.searchParams.set("error", "blocked");
          const response = NextResponse.redirect(loginUrl);

          response.cookies.set(COOKIE_NAMES.sid, "", {
            expires: new Date(0),
            path: "/",
          });

          return response;
        }
      }

      if (isAuthPage) return NextResponse.next();

      const response = NextResponse.redirect(getLoginUrl(inferredPrefix));

      response.cookies.set(COOKIE_NAMES.sid, "", {
        expires: new Date(0),
        path: "/",
      });

      return response;
    } catch (_err) {
      if (isAuthPage) return NextResponse.next();

      const response = NextResponse.redirect(getLoginUrl(inferredPrefix));

      response.cookies.set(COOKIE_NAMES.sid, "", {
        expires: new Date(0),
        path: "/",
      });

      return response;
    }
  }

  if (isAuthPage) return NextResponse.next();

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/recruiter/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
  ],
};
