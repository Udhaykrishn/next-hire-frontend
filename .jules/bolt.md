## 2024-05-30 - [Faster Cookie Parsing]
**Learning:** The previous implementation `document.cookie.split("; ").find(...)` created intermediate arrays and involved linear string and array operations which executed for every outgoing API request.
**Action:** Replace split-and-find string operations with a pre-compiled regular expression like `/(?:^|; )XSRF-TOKEN=([^;]*)/` and `match()`. This is particularly useful for hot paths like HTTP request interceptors where the logic runs on every outgoing request.

## 2024-05-30 - [Optimize large static array filtering]
**Learning:** Using chained operations like `array.filter(condition).slice(0, N)` on large datasets (e.g. thousands of cities) forces the engine to evaluate the condition on the *entire* array before truncating.
**Action:** Replace chained `.filter().slice()` with a native `for` loop that performs an early `break` when the maximum number of items (N) is reached, and precompute invariant operations like `.toLowerCase()` outside the loop.

## 2024-05-30 - [Debounce hook used for API calls triggered on keystroke]
**Learning:** Hooking up user input state directly to a query parameter without debouncing causes an immediate API call on every keystroke, introducing a severe performance bottleneck and overwhelming the backend.
**Action:** Always wrap user text inputs linked to query parameters with a debounce hook (e.g. `useDebouncedValue` from `@tanstack/react-pacer`) to throttle state updates sent to backend endpoints.
