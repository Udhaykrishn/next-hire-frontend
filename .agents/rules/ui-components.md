# UI Component Rules

- **COMPONENT REGISTRY PRIORITY (STRICT)**:
    1.  **Animate UI**: You MUST check and install components from the Animate UI registry FIRST. Use `shadcn add` with the animate-ui URL or package.
    2.  **shadcn/ui**: Use the default shadcn/ui registry ONLY as a fallback if the component does not exist in Animate UI.
- **Consistency**: Maintain a premium feel by ensuring all components follow the Satoshi font hierarchy and Wise Green color palette.
- **Thin Components**: Keep components focused on rendering. Business logic must be moved to custom hooks.
- **Styling**: Use Vanilla CSS or Tailwind CSS as configured in `globals.css`. Do not add ad-hoc utility styles if a design token exists.
