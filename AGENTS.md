<!-- BEGIN:nextjs-agent-rules -->
# Antigravity Rules - Next Hire Project

This project follows a strict set of rules to ensure code quality, type safety, and architectural integrity.

## Core Project Rules

1.  **TypeScript Strictness**: Refer to [.agents/rules/typescript.md](file:///.agents/rules/typescript.md). **Banned: `any` keyword.**
2.  **Server State & API**: Refer to [.agents/rules/tanstack.md](file:///.agents/rules/tanstack.md). **Mandatory: TanStack Query.**
3.  **UI & Components**: Refer to [.agents/rules/ui-components.md](file:///.agents/rules/ui-components.md). **Priority: Animate UI > shadcn/ui.**
4.  **File Protection**: Refer to [.agents/rules/file-protection.md](file:///.agents/rules/file-protection.md). **Strictly NO edits to `components/ui/`, `components/animate-ui/`, or `components/base/`.**
5.  **Package Manager**: **ALWAYS use Bun (`bun`)**.
6.  **Clean Architecture**: 
    - UI Components: Thin, rendering only.
    - Logic/State: Custom hooks in `hooks/`.
    - API Calls: Services in `services/`.
    - Types: Centralized in `types/`.

## Design System (Wise Green)
- **Font**: Satoshi
- **Hierarchy**:
    - Display Hero: 48px
    - Sub-heading: 20px (900, 23px LH)
    - Paragraph: 15px (400, 19.2px LH)
    - Nav Links/Card Title: 16px
- **Colors**: Consistently use the Wise Green palette.

## Job Portal Development Guide
Refer to [DESIGN.md](file:///DESIGN.md) and the roadmap in this file for building the AI-driven career ecosystem (Candidate Manager, Advanced ATS, SaaS monetization).
<!-- END:nextjs-agent-rules -->
