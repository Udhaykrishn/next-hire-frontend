## 2024-05-30 - [Faster Cookie Parsing]
**Learning:** The previous implementation `document.cookie.split("; ").find(...)` created intermediate arrays and involved linear string and array operations which executed for every outgoing API request.
**Action:** Replace split-and-find string operations with a pre-compiled regular expression like `/(?:^|; )XSRF-TOKEN=([^;]*)/` and `match()`. This is particularly useful for hot paths like HTTP request interceptors where the logic runs on every outgoing request.

## 2024-05-30 - [Optimize large static array filtering]
**Learning:** Using chained operations like `array.filter(condition).slice(0, N)` on large datasets (e.g. thousands of cities) forces the engine to evaluate the condition on the *entire* array before truncating.
**Action:** Replace chained `.filter().slice()` with a native `for` loop that performs an early `break` when the maximum number of items (N) is reached, and precompute invariant operations like `.toLowerCase()` outside the loop.
## 2024-03-24 - Debouncing Rapid Text Inputs for Network Calls
**Learning:** The `useJobList` hook in `features/jobs/hooks/use-job-list.ts` issues network queries via TanStack React Query (`useJobsForCandidateQuery`) triggered directly by the raw state of `query` (search) and `location` text fields. Since these states update on every keystroke, a fast typist will trigger dozens of redundant network requests, causing potential server strain and frontend jank while React Query handles rapid suspense/re-renders.
**Action:** Used the already installed `@tanstack/react-pacer` package to apply a debounce (`useDebouncedValue(value, { wait: 400 })`) to text inputs before passing them into query parameters. This matches patterns found elsewhere in the codebase (e.g. `useAdminJobs`) and dramatically cuts down unnecessary API calls.
