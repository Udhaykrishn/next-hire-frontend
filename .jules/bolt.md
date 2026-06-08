## 2024-05-30 - [Faster Cookie Parsing]
**Learning:** The previous implementation `document.cookie.split("; ").find(...)` created intermediate arrays and involved linear string and array operations which executed for every outgoing API request.
**Action:** Replace split-and-find string operations with a pre-compiled regular expression like `/(?:^|; )XSRF-TOKEN=([^;]*)/` and `match()`. This is particularly useful for hot paths like HTTP request interceptors where the logic runs on every outgoing request.

## 2024-05-31 - [Array Iteration Optimization in Type-ahead Filters]
**Learning:** Using `.filter(condition).slice(0, N)` on large arrays (like a list of 4000+ cities) is computationally wasteful because `.filter` processes the *entire* array before `.slice` limits the result. Additionally, performing `.toLowerCase()` inside the loop for every single item on every keystroke causes unnecessary CPU load and garbage collection overhead.
**Action:** Replace `.filter().slice()` with a standard `for` loop combined with an early `break` condition when the desired array length is reached. Furthermore, pre-calculate expensive operations like `.toLowerCase()` during array initialization to ensure they only run once, not repeatedly on every keystroke.
