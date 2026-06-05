## 2024-06-05 - Admin Header Accessibility Improvements
**Learning:** Found several icon-only buttons in the AdminHeader component (Sun, Moon, Bell) that lacked ARIA labels, making them inaccessible to screen reader users. This seems to be a common pattern for utility buttons in the header.
**Action:** Always verify icon-only buttons have descriptive `aria-label`s and appropriate `title` attributes for tooltips, and consider adding screen reader specific text (`sr-only`) if appropriate.
