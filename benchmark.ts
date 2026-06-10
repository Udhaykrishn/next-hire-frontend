const iterations = 1000000;
const rawSetCookie =
  "cookie1=value1; Path=/, cookie2=value2; Path=/,   , cookie3=value3; Path=/";

console.time("Original");
for (let i = 0; i < iterations; i++) {
  const _result = rawSetCookie
    .split(/,(?=[^;])/)
    .map((s) => s.trim())
    .filter(Boolean);
}
console.timeEnd("Original");

console.time("Optimized");
for (let i = 0; i < iterations; i++) {
  const _result = rawSetCookie.split(/,(?=[^;])/).reduce<string[]>((acc, s) => {
    const trimmed = s.trim();
    if (trimmed) acc.push(trimmed);
    return acc;
  }, []);
}
console.timeEnd("Optimized");

console.time("Optimized (for loop)");
for (let i = 0; i < iterations; i++) {
  const parts = rawSetCookie.split(/,(?=[^;])/);
  const result: string[] = [];
  for (let j = 0; j < parts.length; j++) {
    const trimmed = parts[j].trim();
    if (trimmed) result.push(trimmed);
  }
}
console.timeEnd("Optimized (for loop)");
