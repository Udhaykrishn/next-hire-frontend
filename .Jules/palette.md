## 2024-06-05 - Admin Header Accessibility Improvements
**Learning:** Found several icon-only buttons in the AdminHeader component (Sun, Moon, Bell) that lacked ARIA labels, making them inaccessible to screen reader users. This seems to be a common pattern for utility buttons in the header.
**Action:** Always verify icon-only buttons have descriptive `aria-label`s and appropriate `title` attributes for tooltips, and consider adding screen reader specific text (`sr-only`) if appropriate.

## 2026-06-06 - Keyboard Navigation on Hidden Actions
**Learning:** Found a pattern where secondary/destructive actions (like 'Edit', 'Delete', 'Remove skill') are hidden by default and only revealed on `group-hover`. This makes them invisible to keyboard users who tab through the interface. Furthermore, these were often icon-only buttons missing `aria-label` attributes.
**Action:** Whenever using `opacity-0 group-hover:opacity-100` to hide actions, always pair it with `focus-within:opacity-100` on the container or `focus:opacity-100` on the interactive element itself so it appears during keyboard navigation. Additionally, ensure icon-only buttons always have an `aria-label` and `title`.
