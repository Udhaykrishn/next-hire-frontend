# Design System - Next Hire (Satoshi Edition)

## 1. Visual Theme & Atmosphere

The design system has been refined for a professional, high-end corporate aesthetic using the **Wise color palette**. We have moved away from the "over-designed" massive typography to a more balanced, legible, and sophisticated layout suitable for professional laptop viewing. 

The typography now utilizes **Satoshi**, a modern grotesque typeface that offers clean lines and exceptional readability. The palette remains anchored in the distinctive Wise Green and near-black scheme, ensuring the interface feels fresh and alive while maintaining professional restraint.

**Key Characteristics:**
- **Satoshi** as the primary typeface family.
- **Wise Green** (`#9fe870`) as the signature accent.
- Professional, restrained font sizes (no more 100px+ headlines).
- High-contrast hierarchy for clear information architecture.
- Smooth transitions and subtle micro-animations (scale 1.02 on hover).
- Pill-shaped components and soft rounded cards (12px–16px).

## 2. Color Palette & Roles
c
### Primary Brand
- **Wise Green** (`#9fe870`): Primary CTA buttons, brand accent.
- **Near Black** (`#0e0f0c`): Primary text, background for dark sections.
- **Dark Green** (`#163300`): Button text on green, deep green accent.
- **Light Mint** (`#e2f6d5`): Soft green surface, badge backgrounds.
- **Pastel Green** (`#cdffad`): Hover states and interactive contrast.

### Semantic
- **Positive Green** (`#054d28`): Success states.
- **Danger Red** (`#d03238`): Error/Destructive states.
- **Warning Yellow** (`#ffd11a`): Warning states.
- **Background Cyan** (`rgba(56,200,255,0.10)`): Info tints.
- **Bright Orange** (`#ffc091`): Warm accents.

### Neutral
- **Pure White** (`#ffffff`): Main background.
- **Warm Dark** (`#454745`): Secondary text, borders.
- **Gray** (`#868685`): Muted text, tertiary.
- **Light Surface** (`#e8ebe6`): Subtle green-tinted light surface.

## 3. Typography Rules

### Font Families
- **Primary**: `Satoshi`, `"Satoshi Fallback"`, `sans-serif`.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| Display Hero | Satoshi | 48px | 900 | 56px | For main landing page headers. |
| Section Heading | Satoshi | 32px | 800 | 40px | For major content sections. |
| Sub-heading | Satoshi | 20px | 900 | 23px | Secondary headings. |
| Navbar Link | Satoshi | 16px | 500 | 20px | Navigation menu items. |
| Card Title | Satoshi | 16px | 700 | 20px | For interactive cards. |
| Paragraph | Satoshi | 15px | 400 | 19.2px | Standard body content. |
| Footer Menu | Satoshi | 14px | 500 | 18px | Footer navigation links. |
| Description | Satoshi | 14px | 500 | 20px | Secondary/Muted descriptions. |
| Small / Label | Satoshi | 12px | 500 | 16px | Metadata and tags. |

### Principles
- **Professionalism over Scale**: Headlines are capped to ensure they don't dominate the viewport on laptops.
- **Legibility**: Generous line-heights (1.2 to 1.5 ratio) for long-form reading.
- **Weight Contrast**: Using 900 for headings vs 400/500 for body creates a clear visual path.

## 4. Component Stylings

### Buttons
**Primary Wise Action**
- Background: `#9fe870` (Wise Green)
- Text: `#163300` (Dark Green)
- Font: Satoshi 16px, Weight 600
- Radius: 9999px (Pill)
- Hover: scale(1.02)

**Secondary Subtle**
- Background: `rgba(22, 51, 0, 0.08)`
- Text: `#0e0f0c`
- Radius: 9999px

### Cards
- Radius: 16px
- Border: 1px solid rgba(14,15,12,0.12)
- Padding: 24px

## 5. Spacing System
- Base unit: 4px
- Standard increments: 4, 8, 12, 16, 24, 32, 48, 64.

## 7. Job Portal Layout Structure (Naukri Inspired)

This layout is optimized for high-volume information discovery and a streamlined "search-to-apply" workflow.

### 7.1 Global Navigation (Header)
- **Position**: Sticky to top, high z-index.
- **Background**: Pure White (`#ffffff`) with a subtle bottom border (`1px solid #e2e2e2`).
- **Structure**:
    - **Left**: Logo + Primary Links (Jobs, Companies, Services) using **Navbar Link** style.
    - **Center**: Compact Search Bar (visible on scroll) or "Quick Search" trigger.
    - **Right**: Secondary Actions (Login, Register) + **"For Employers"** CTA using a **Secondary Subtle** pill button.

### 7.2 Search-First Landing (Hero Section)
- **Layout**: Centered content on a clean white background.
- **Headline**: **Display Hero** (48px, 900) positioned centrally.
- **Search Box**: A large, elevated pill-shaped container (9999px radius).
    - **Inputs**: Two distinct fields separated by a vertical divider ("Skills, Designation" and "Location").
    - **Action**: A prominent **Primary Wise Action** button labeled "Search".
- **Quick Discovery**: A row of **Pastel Green** badges below the search box for popular categories (e.g., Remote, MNC, Software).

### 7.3 Job Search Results (SERP)
- **Layout**: Three-column grid for professional desktop viewing.
    - **Left Sidebar (20%)**: Filter Facets (Salary, Department, Experience) using accordion menus.
    - **Center Content (55%)**: A vertical feed of Job Listing Cards.
    - **Right Widget (25%)**: "Recommended for You" or "Jobs in High Demand" side-cards.

### 7.4 Job Listing Card Anatomy
- **Structure**:
    - **Header**: **Card Title** (16px, 700) for the Job Role, followed by the Company Name in **Description** style.
    - **Meta Row**: A horizontal list of labels (Experience, Salary, Location) using **Small / Label** style with subtle Lucide icons.
    - **Description Snippet**: 2 lines of text in **Paragraph** style (15px, 400).
    - **Footer**: "Posted X days ago" on the left; **Primary Wise Action** (Apply) on the right.

### 7.5 Candidate / Recruiter Dashboard
- **Vertical Navigation**: A left-aligned nav-rail for "Applied Jobs", "Saved", "Interviews", and "Profile".
- **Status Trackers**: Progress steps for applications using **Wise Green** to indicate completed stages (Shortlisted, Viewed, etc.).

## 8. Do's and Don'ts

### Do
- Use Satoshi for all text.
- Use Wise Green for primary CTAs and brand accents.
- Maintain the defined hierarchy for consistency.
- Implement sticky headers for easy navigation during long scrolls.
- Use information-dense cards to reduce scrolling on laptop screens.

### Don't
- Don't exceed 48px for display text on standard desktop views.
- Don't use Wise Green as a background for large text-heavy surfaces.
- Don't use "over-designed" massive typography that hides content.
- Avoid multi-column text layouts for job descriptions; stick to a single, readable column.
