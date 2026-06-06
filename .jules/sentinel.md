## 2024-05-24 - Unsanitized dangerouslySetInnerHTML Usage
**Vulnerability:** Found multiple instances of `dangerouslySetInnerHTML` in job details components (`features/admin/components/AdminJobDetails.tsx`, `features/jobs/components/job-details/JobDescriptionCard.tsx`) where user-generated input (`job.description`, `job.jobDescription`) is rendered without sanitization, posing a High XSS risk.
**Learning:** Even internal/admin panels and display cards need proper sanitization for user-generated HTML content to prevent stored XSS attacks.
**Prevention:** Always use a sanitization library like `isomorphic-dompurify` (already a dependency) when rendering HTML strings using `dangerouslySetInnerHTML`.
