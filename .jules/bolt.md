## 2024-05-30 - [Faster Cookie Parsing]
**Learning:** The previous implementation `document.cookie.split("; ").find(...)` created intermediate arrays and involved linear string and array operations which executed for every outgoing API request.
**Action:** Replace split-and-find string operations with a pre-compiled regular expression like `/(?:^|; )XSRF-TOKEN=([^;]*)/` and `match()`. This is particularly useful for hot paths like HTTP request interceptors where the logic runs on every outgoing request.

## 2024-06-06 - [Extract Heavy Computations to Module Level]
**Learning:** React components (especially with Modals) can mount/unmount or render many times. Placing expensive, static computations (like `City.getCitiesOfCountry("IN")` which parses a large JSON dataset) inside the component body using `useMemo` only caches it for that component instance's lifetime. It still recalculates on every mount, leading to ~100ms delays and potential UI jank.
**Action:** Always extract heavy, environment-agnostic static computations and large dataset parsing to the module level (outside the React component). This ensures the work is done exactly once when the file is parsed by the JS engine, resulting in instant subsequent access.
