# Haarlems Oktoberfest — Style Guide

## Colors

| Token               | Hex       | Usage                              |
|---------------------|-----------|------------------------------------|
| `--color-primary`   | `#0B7BC0` | Bavarian blue — buttons, links     |
| `--color-primary-dark` | `#065A8F` | Hover states                    |
| `--color-white`     | `#FFFFFF` | Backgrounds, text on dark          |
| `--color-gold`      | `#D4A843` | Warm accents, CTA highlights       |
| `--color-gold-light`| `#F5DEB3` | Subtle warm backgrounds            |
| `--color-dark`      | `#1A1A2E` | Body text, headings                |
| `--color-gray`      | `#6B7280` | Secondary text                     |
| `--color-gray-light`| `#F3F4F6` | Alternate section backgrounds      |

## Typography

| Role          | Font             | Weight    | Fallback    |
|---------------|------------------|-----------|-------------|
| Display/Title | Deutsch Gothic   | normal    | cursive     |
| Body          | DM Sans          | 400, 500, 700 | sans-serif |

## Spacing (8px grid)

| Token          | Value  |
|----------------|--------|
| `--space-xs`   | 4px    |
| `--space-sm`   | 8px    |
| `--space-md`   | 16px   |
| `--space-lg`   | 24px   |
| `--space-xl`   | 32px   |
| `--space-2xl`  | 48px   |
| `--space-3xl`  | 64px   |
| `--space-4xl`  | 96px   |

## Border Radius

| Token           | Value  |
|-----------------|--------|
| `--radius-sm`   | 4px    |
| `--radius-md`   | 8px    |
| `--radius-lg`   | 16px   |
| `--radius-full` | 9999px |

## Breakpoints (mobile-first)

| Name    | Min-width |
|---------|-----------|
| Tablet  | 768px     |
| Desktop | 1024px    |
| Wide    | 1280px    |

## Bavarian Diamond Pattern

Used as decorative dividers between sections. Implemented as inline SVG data URI in CSS — tileable blue (#0B7BC0) and white (#FFFFFF) diamond checkerboard.
