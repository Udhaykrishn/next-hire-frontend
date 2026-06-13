## 2024-06-05 - Admin Header Accessibility Improvements
**Learning:** Found several icon-only buttons in the AdminHeader component (Sun, Moon, Bell) that lacked ARIA labels, making them inaccessible to screen reader users. This seems to be a common pattern for utility buttons in the header.
**Action:** Always verify icon-only buttons have descriptive `aria-label`s and appropriate `title` attributes for tooltips, and consider adding screen reader specific text (`sr-only`) if appropriate.
## 2024-06-09 - Keyboard Accessibility for Hover-Revealed Actions
**Learning:** Found that secondary actions (like Edit/Delete in ProfileItemCard) were hidden using `opacity-0 group-hover:opacity-100`. This pattern makes the actions completely invisible and unusable for keyboard users since `group-hover` does not trigger on focus.
**Action:** Always pair `opacity-0 group-hover:opacity-100` utility classes with `focus-within:opacity-100` on the parent container (or `focus:opacity-100` on the elements themselves) to ensure interactive elements remain visible and usable when navigated to via keyboard (Tab key).
## 2024-06-13 - Icon-Only Button Accessibility in List Cards
**Learning:** Found a pattern where icon-only buttons (e.g., ChevronRight) used for navigation within list cards (like CandidateApplicationCard) lack ARIA labels, making the navigation target unclear to screen reader users.
**Action:** Always verify icon-only buttons, even when wrapped in a semantic link or action container, have descriptive `aria-label`s and appropriate `title` attributes for tooltips to ensure accessibility for all interactive elements in list items.
