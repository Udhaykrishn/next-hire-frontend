## 2024-05-30 - [Faster Cookie Parsing]
**Learning:** The previous implementation `document.cookie.split("; ").find(...)` created intermediate arrays and involved linear string and array operations which executed for every outgoing API request.
**Action:** Replace split-and-find string operations with a pre-compiled regular expression like `/(?:^|; )XSRF-TOKEN=([^;]*)/` and `match()`. This is particularly useful for hot paths like HTTP request interceptors where the logic runs on every outgoing request.

## 2024-05-30 - [Faster array search with early returns and precomputation]
**Learning:** Native array methods like `.filter(...).slice(0, 100)` process the entire array even after the desired number of elements is found. For large datasets like `indianCities` (4200+ items), this causes unnecessary operations on every keystroke. Furthermore, calculating `.toLowerCase()` inside the loop on each item is redundant and expensive.
**Action:** Precompute case-insensitive search names when caching static datasets. Instead of `.filter().slice()`, use a standard `for` loop with an early `break` once the desired limit is reached.
