## 2024-05-30 - [Faster Cookie Parsing]
**Learning:** The previous implementation `document.cookie.split("; ").find(...)` created intermediate arrays and involved linear string and array operations which executed for every outgoing API request.
**Action:** Replace split-and-find string operations with a pre-compiled regular expression like `/(?:^|; )XSRF-TOKEN=([^;]*)/` and `match()`. This is particularly useful for hot paths like HTTP request interceptors where the logic runs on every outgoing request.

## 2024-05-30 - [Optimize large static array filtering]
**Learning:** Using chained operations like `array.filter(condition).slice(0, N)` on large datasets (e.g. thousands of cities) forces the engine to evaluate the condition on the *entire* array before truncating.
**Action:** Replace chained `.filter().slice()` with a native `for` loop that performs an early `break` when the maximum number of items (N) is reached, and precompute invariant operations like `.toLowerCase()` outside the loop.
## 2025-02-28 - Debounce Search Filters
**Learning:** React state variables bound directly to inputs (`onChange={(e) => setQuery(e.target.value)}`) that are also passed as arguments to `useQuery` or `useSuspenseQuery` will trigger an API call and component re-render on *every single keystroke*.
**Action:** Use the existing `@tanstack/react-pacer` package (specifically the `useDebouncedValue` hook) to wrap rapidly changing state values before passing them into the query hook, effectively throttling API requests and reducing main-thread jank during typing.
