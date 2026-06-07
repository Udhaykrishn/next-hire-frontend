## 2024-06-05 - Admin Header Accessibility Improvements
**Learning:** Found several icon-only buttons in the AdminHeader component (Sun, Moon, Bell) that lacked ARIA labels, making them inaccessible to screen reader users. This seems to be a common pattern for utility buttons in the header.
**Action:** Always verify icon-only buttons have descriptive `aria-label`s and appropriate `title` attributes for tooltips, and consider adding screen reader specific text (`sr-only`) if appropriate.
## 2026-06-07 - Hidden Action Keyboard Accessibility
**Learning:** Secondary actions hidden via `opacity-0 group-hover:opacity-100` become invisible to keyboard-only users who navigate via Tab.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the container or `focus:opacity-100` on the interactive elements to ensure they appear when focused via keyboard.
