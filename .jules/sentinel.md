## 2024-05-24 - [Fix XSS Vulnerabilities in dangerouslySetInnerHTML Usage]
**Vulnerability:** Found `dangerouslySetInnerHTML` in `JobDescriptionCard.tsx` and `AdminJobDetails.tsx` being used with unsanitized user inputs (`job.description` and `job.jobDescription`), resulting in potential Cross-Site Scripting (XSS) vulnerabilities.
**Learning:** Even internal and admin-facing components are susceptible to XSS if user-provided content (like job descriptions) is rendered directly without sanitization. The use of React's `dangerouslySetInnerHTML` requires mandatory sanitization for safety.
**Prevention:** Always use a well-tested HTML sanitization library (such as `DOMPurify`, or `isomorphic-dompurify` for Next.js SSR applications) to wrap user-provided HTML content *before* rendering it via `dangerouslySetInnerHTML`.

## 2026-06-10 - [Unauthenticated API Proxy Routes]
**Vulnerability:** The `app/api/auth/block/route.ts` and `app/api/auth/refresh/route.ts` proxy routes were forwarding requests to the backend API without checking if a `cookie` actually existed in the incoming request.
**Learning:** Proxy routes in Next.js that expose backend endpoints can be abused if they blindly forward requests without any authentication checking on the edge, potentially resulting in spam or Server-Side Request Forgery (SSRF) if parameters are unchecked.
**Prevention:** Always validate that incoming requests to proxy routes have the necessary credentials (like a session cookie) before blindly forwarding them to the backend server.
