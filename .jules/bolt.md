## 2024-05-30 - [Faster Cookie Parsing]
**Learning:** The previous implementation `document.cookie.split("; ").find(...)` created intermediate arrays and involved linear string and array operations which executed for every outgoing API request.
**Action:** Replace split-and-find string operations with a pre-compiled regular expression like `/(?:^|; )XSRF-TOKEN=([^;]*)/` and `match()`. This is particularly useful for hot paths like HTTP request interceptors where the logic runs on every outgoing request.

## 2024-05-30 - [Optimize large static array filtering]
**Learning:** Using chained operations like `array.filter(condition).slice(0, N)` on large datasets (e.g. thousands of cities) forces the engine to evaluate the condition on the *entire* array before truncating.
**Action:** Replace chained `.filter().slice()` with a native `for` loop that performs an early `break` when the maximum number of items (N) is reached, and precompute invariant operations like `.toLowerCase()` outside the loop.

## 2024-05-31 - [Optimize redundant string conversions in loops]
**Learning:** Calling methods like `.toLowerCase()` inside a loop or `.filter()` condition (e.g. `lang.toLowerCase().includes(searchQuery.toLowerCase())`) recalculates the same value multiple times, resulting in unnecessary string allocations and CPU usage.
**Action:** Extract invariant calculations, such as lowercasing a search query, outside of the loop. Combine this with `useMemo` to ensure the filtered list is only recomputed when the specific dependency (e.g. `searchQuery`) changes, rather than on every render.
