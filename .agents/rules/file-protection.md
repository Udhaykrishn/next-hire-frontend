# File Protection Rules

To maintain the integrity of the core design system and UI library, certain directories are strictly off-limits for modification by AI agents.

## Restricted Directories

Modification of files within the following directories is **STRICTLY PROHIBITED**:

1.  `components/ui/`: Core shadcn/ui and basic UI components.
2.  `components/animate-ui/`: Premium animated components and primitives.
3.  `components/base/`: Fundamental base components and layout primitives.

## Rationale
These components are part of a standardized design system. Changes should be made through composition in page-level components or by creating new components in `components/shared/` or other non-restricted directories.

## How to proceed if changes are needed
If a core component requires a fix or enhancement:
- Implement the logic/styling at the usage site (e.g., in the `page.tsx` or a custom hook).
- Wrap the component in a local container or use composition.
- Request the user to make the change manually if it's a critical fix in the core library.
