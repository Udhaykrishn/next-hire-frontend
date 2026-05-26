import axios from "axios";

// Create an Axios instance configured to automatically handle CSRF tokens.
// Since the backend stores the token in a cookie, setting `withCredentials: true`
// ensures cookies are sent with requests.
// Axios will automatically read the cookie specified by `xsrfCookieName`
// and attach it as a header specified by `xsrfHeaderName`.
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  withCredentials: true,

  // Adjust these names if your backend uses different standard names
  // (e.g., Laravel uses XSRF-TOKEN and X-XSRF-TOKEN by default)
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
});

export default api;
