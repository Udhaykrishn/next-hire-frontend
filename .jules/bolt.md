## 2024-05-30 - [Faster Cookie Parsing]
**Learning:** The previous implementation `document.cookie.split("; ").find(...)` created intermediate arrays and involved linear string and array operations which executed for every outgoing API request.
**Action:** Replace split-and-find string operations with a pre-compiled regular expression like `/(?:^|; )XSRF-TOKEN=([^;]*)/` and `match()`. This is particularly useful for hot paths like HTTP request interceptors where the logic runs on every outgoing request.

## 2024-05-30 - [Optimize large static array filtering]
**Learning:** Using chained operations like `array.filter(condition).slice(0, N)` on large datasets (e.g. thousands of cities) forces the engine to evaluate the condition on the *entire* array before truncating.
**Action:** Replace chained `.filter().slice()` with a native `for` loop that performs an early `break` when the maximum number of items (N) is reached, and precompute invariant operations like `.toLowerCase()` outside the loop.

## 2026-06-12 - [Debounce fast-changing UI inputs to prevent redundant API queries]
**Learning:** Directly binding React state (like text inputs) to TanStack query parameters causes an API request to be fired on every single keystroke. This causes excessive network traffic and can lead to race conditions or UI lag.
**Action:** Use a debounce hook (like `useDebouncedValue` from `@tanstack/react-pacer`) on search/filter inputs before passing them as query keys/parameters. This ensures the API request only fires once the user has stopped typing for a specified wait time (e.g., 400ms).
