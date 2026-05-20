# TanStack Query Best Practices

- **Mandatory Usage**: Always use `@tanstack/react-query` for all server-state management and API interactions.
- **Custom Hooks**: Wrap all queries (`useQuery`) and mutations (`useMutation`) in custom hooks within the `hooks/` directory.
- **Server-Side Prefetching**: Implement server-side prefetching (e.g., using `prefetchQuery` in Server Components) where applicable to ensure fast initial page loads.
- **Side Effects**: Handle all side effects (like success/error toasts, navigation) within the mutation/query handlers in the hook, not in the UI component.
- **Skill Reference**: Refer to the `tanstack-query-best-practices` skill for detailed implementation patterns.
