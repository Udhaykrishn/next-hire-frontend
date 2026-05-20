---
name: clean-architecture-react
description: Enforces strict separation of concerns, custom hooks for logic, and a services layer for API interactions in React applications.
---

# Clean Architecture for React

This skill enforces a professional, scalable architecture for React applications. It focuses on extreme modularity, reusability, and strict separation of concerns.

## 1. Directory Structure & Responsibilities

| Directory | Responsibility | Content |
| :--- | :--- | :--- |
| `components/` | **UI / Visual Layer** | Purely rendering, basic event handling, local UI state. |
| `hooks/` | **Business Logic Layer** | Custom hooks containing state, side effects, and TanStack Query logic. |
| `services/` | **Data Access Layer** | API call definitions (Axios/Fetch), base API configurations. |
| `types/` | **Definition Layer** | All TypeScript interfaces and types. |
| `pages/` / `app/` | **Route Layer** | Page layouts and routing logic. |

## 2. Strict Implementation Rules

### 2.1 Components are for Rendering Only
- **NO** complex business logic inside component files.
- **NO** direct API calls (`axios.get`, `fetch`, etc.).
- **NO** inline Type/Interface definitions.
- **NO** TanStack Query calls directly (e.g., `useQuery`) unless it's a very simple UI-only query. Prefer wrapping in custom hooks.

### 2.2 Custom Hooks for All Logic
- Move all `useEffect`, `useState` (if complex), and `useQuery` calls into a custom hook.
- Custom hooks should return only what the component needs to render.
- Keep logic modular: `useJobSearch`, `useAuth`, `useProfileUpdate`.

### 2.3 Services Layer for API Interactions
- Define all API endpoints in a `services/` directory.
- Use a base client (e.g., `apiClient.ts`) to handle headers, base URL, and interceptors.
- Example: `jobService.ts` contains `getJobs()`, `applyToJob()`.

### 2.4 Centralized Type Management
- All domain types (e.g., `Job`, `User`, `ApiResponse`) must be in a `types/` folder.
- Share types between services, hooks, and components by importing them.

## 3. Best Practices (TanStack Query)

- **Always** wrap `useQuery` and `useMutation` in custom hooks.
- Use **Query Keys** consistently (standardize them in a separate constants file if needed).
- Leverage `onSuccess` and `onError` in mutations within the hook to handle side effects (like toast notifications) rather than in the component.

## 4. Code Examples

### ❌ BAD: Over-engineered Component
```tsx
// src/components/JobCard.tsx
interface Job { id: string; title: string; } // ERROR: Type in component

export function JobCard() {
  const [data, setData] = useState<Job[]>([]);
  
  useEffect(() => { // ERROR: API logic in component
    axios.get('/jobs').then(res => setData(res.data));
  }, []);

  return <div>{/* render */}</div>;
}
```

### ✅ GOOD: Clean Architecture
```typescript
// src/types/job.ts
export interface Job { id: string; title: string; }

// src/services/jobService.ts
export const getJobs = async (): Promise<Job[]> => {
  const response = await apiClient.get('/jobs');
  return response.data;
};

// src/hooks/useJobs.ts
export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs
  });
}

// src/components/JobCard.tsx
import { useJobs } from '@/hooks/useJobs';
import { Job } from '@/types/job';

export function JobCard() {
  const { data, isLoading } = useJobs(); // UI only consumes the hook
  if (isLoading) return <Loading />;
  return <div>{data?.map(job => <span key={job.id}>{job.title}</span>)}</div>;
}
```

## 5. Summary Checklist
1. Is this logic in a custom hook?
2. Are these types in the `types/` folder?
3. Is this API call in the `services/` layer?
4. Is the component strictly focused on UI?
