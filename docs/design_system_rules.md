# Prism Design System Rules

This document defines the design system rules for the Prism Foundations library, extracted from the Figma design system. Use these rules when implementing UI components and styling to maintain consistency across the application.

## Table of Contents
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Shadows](#shadows)
- [Data Visualization](#data-visualization)
- [Status Indicators](#status-indicators)
- [Accessibility](#accessibility)
- [Implementation Guidelines](#implementation-guidelines)

## Color System

The Prism design system includes a comprehensive color palette with 11 color scales (Gray, Blue, Blurple, Teal, Green, Lime, Yellow, Orange, Red, Magenta, Purple), status indicators, data visualization palettes (categorical A-D and diverging A-G), and NPS colors. All colors are available as CSS custom properties in the tokens section below.

### Color Usage Guidelines

#### Primary Actions
- Use **Primary Color** (`var(--primary-color)`) for primary buttons and calls-to-action
- Use **Gray 100** (`var(--gray-100)`) for primary text
- Use **Gray 0** (`var(--gray-0)`) for primary backgrounds

#### Secondary Actions
- Use gray scale for neutral elements and disabled states

#### Status and Feedback
- Use status colors for feedback indicators
- Use data visualization palettes for charts and graphs
- Maintain color accessibility standards (WCAG AA minimum)

## Typography

The Prism design system uses Inter as the primary font family and Sora for headings. All typography tokens are available as CSS custom properties in the tokens section below.

### Typography Usage Guidelines

#### Headings
- Use Sora font family for main headings (H1, H2)
- Use Inter font family for subheadings (H3, H4, H5, H6)
- Maintain consistent line heights and spacing

#### Body Text
- Use Inter font family for all body text
- Use appropriate font weights (Regular 400, SemiBold 600, Bold 700)
- Maintain readable line heights (1.2-1.5)

#### Links
- Use Inter font family for all links
- Use SemiBold weight (600) for emphasis
- Use primary teal color (#128297) for link styling
- Provide both default and underlined variants

## Spacing & Layout

### Spacing Guidelines

#### Component Spacing
- Use consistent spacing between related elements
- Follow 8px grid system for component spacing
- Use larger spacing (16px, 24px) for section separation

#### Layout Spacing
- Use gray scale colors for borders and dividers
- Maintain consistent padding and margins
- Use appropriate spacing for different screen sizes

## Shadows

The design system includes drop shadows for depth and elevation:
- **Drop Shadow Down**: 4 depth levels for elements that appear above content
- **Drop Shadow Up**: 4 depth levels for elements that appear below content  
- **Drop Shadow Side**: 1 depth level for side navigation and panels

## Data Visualization

The design system includes categorical palettes (A-D) and diverging palettes (A-G) for data visualization, plus special NPS colors. All data visualization colors are available as CSS custom properties in the tokens section below.

### Data Visualization Guidelines
- Use categorical palettes for distinct data categories
- Use diverging palettes for data with neutral midpoints
- Use NPS colors specifically for Net Promoter Score visualizations
- Ensure sufficient color contrast for accessibility

## Status Indicators

Status colors are used for feedback indicators and system states. All status colors are available as CSS custom properties in the tokens section below.

### Status Color Guidelines
- **Good**: Use for success states and positive feedback
- **Sorta Good**: Use for moderately positive states
- **Ambiguous**: Use for neutral or unclear states
- **So-so**: Use for mixed or moderate states
- **Sorta Bad**: Use for moderately negative states
- **Bad**: Use for error states and negative feedback
- **Archive/Done/Off**: Use for inactive or completed states

## Accessibility

### Accessibility Guidelines
- Maintain minimum 4.5:1 contrast ratio for normal text
- Maintain minimum 3:1 contrast ratio for large text
- Maintain color accessibility standards (WCAG AA minimum)
- Use semantic HTML and ARIA attributes
- Ensure keyboard navigation support
- Test with screen readers

### Performance
- Optimize images and assets
- Use efficient CSS selectors
- Minimize CSS bundle size
- Implement proper caching strategies

## Implementation Guidelines

### CSS Tokens
Complete CSS custom properties for all design tokens, organized by design system sections:

```css
:root {
  /* ===== COLOR SYSTEM ===== */
  
  /* Primary Colors */
  --primary-color: #128297;
  --border-color: #DADCE5;
  --border-radius: 3px;
  
  /* Gray Palette */
  --gray-0: #FFFFFF;
  --gray-10: #F8F8F9;
  --gray-20: #F4F4F7;
  --gray-30: #EAECF1;
  --gray-40: #DADCE5;
  --gray-50: #BABCC5;
  --gray-60: #9A9CA5;
  --gray-70: #6A6C75;
  --gray-80: #4A4C55;
  --gray-90: #3A3C45;
  --gray-100: #2A2C35;
  --gray-110: #1A1C25;
  
  /* Pink Palette */
  --pink-10: #FFFCFD;
  --pink-20: #FFEBEB;
  --pink-30: #FFD9DB;
  --pink-40: #FFC2C7;
  --pink-50: #FFAAB2;
  --pink-60: #FF94A1;
  --pink-70: #FF8294;
  --pink-80: #FF728A;
  --pink-90: #FF6582;
  --pink-100: #FF587E;
  --pink-110: #FF4876;
  --pink-120: #E6416A;
  --pink-130: #DE2864;
  --pink-140: #98003B;
  
  /* Teal Palette */
  --teal-5: #DBFCFF;
  --teal-10: #B1F3FC;
  --teal-20: #90E4F9;
  --teal-30: #70CDE7;
  --teal-40: #5AB7CF;
  --teal-50: #46A0B9;
  --teal-60: #3290A7;
  --teal-70: #128297;
  --teal-80: #016479;
  --teal-90: #005164;
  --teal-100: #003F52;
  --teal-110: #002F40;
  --teal-120: #082629;
  
  /* Blue Palette */
  --blue-5: #F5FCFE;
  --blue-10: #E2F0FF;
  --blue-20: #BDDDFF;
  --blue-30: #88C2FF;
  --blue-40: #53AFFF;
  --blue-50: #3AA6EC;
  --blue-60: #0B9AD3;
  --blue-70: #028CC2;
  --blue-80: #0182B6;
  --blue-90: #07699B;
  --blue-100: #094B7C;
  --blue-110: #062F5F;
  --blue-120: #022144;
  
  /* Green Palette */
  --green-5: #F3FCF7;
  --green-10: #E3F7ED;
  --green-20: #C7EDDB;
  --green-30: #8DDDB6;
  --green-40: #55D099;
  --green-50: #00C583;
  --green-60: #00BA6D;
  --green-70: #00AA62;
  --green-80: #009855;
  --green-90: #008648;
  --green-100: #006632;
  --green-110: #005027;
  --green-120: #00391C;
  
  /* Lime Palette */
  --lime-10: #F5FFF0;
  --lime-20: #E3FED7;
  --lime-30: #D2FCBE;
  --lime-40: #B2F591;
  --lime-50: #93EC6B;
  --lime-60: #7BE14C;
  --lime-70: #65D036;
  --lime-80: #53BB25;
  --lime-90: #43A11A;
  --lime-100: #358213;
  --lime-110: #27630D;
  --lime-120: #1B4409;
  
  /* Yellow Palette */
  --yellow-5: #FFFDFA;
  --yellow-10: #FFFAF2;
  --yellow-20: #FDEFD5;
  --yellow-30: #FAE4B8;
  --yellow-40: #F5D082;
  --yellow-50: #EFBE53;
  --yellow-60: #E6AF2D;
  --yellow-70: #DBA211;
  --yellow-80: #D09700;
  --yellow-90: #C28E00;
  --yellow-100: #B08300;
  --yellow-110: #9C7600;
  --yellow-120: #876800;
  
  /* Orange Palette */
  --orange-10: #FFF8F1;
  --orange-20: #FFE8D2;
  --orange-30: #FFD8B1;
  --orange-40: #FFB571;
  --orange-50: #FF9237;
  --orange-60: #FF7107;
  --orange-70: #F05B00;
  --orange-80: #DD4600;
  --orange-90: #C73000;
  --orange-100: #AC1C00;
  --orange-110: #8E0B00;
  --orange-120: #700000;
  
  /* Red Palette */
  --red-5: #FFFAFA;
  --red-10: #FFF5F5;
  --red-20: #FCD2D2;
  --red-30: #F8B0B0;
  --red-40: #F17171;
  --red-50: #E83B3B;
  --red-60: #DB1111;
  --red-70: #CE0000;
  --red-80: #BC0000;
  --red-90: #A50000;
  --red-100: #8A0000;
  --red-110: #6A0000;
  --red-120: #4A0000;
  
  /* Magenta Palette */
  --magenta-10: #FFF0FE;
  --magenta-20: #FED6FA;
  --magenta-30: #FBBEF7;
  --magenta-40: #F691ED;
  --magenta-50: #ED6BE1;
  --magenta-60: #E14CD3;
  --magenta-70: #D035C1;
  --magenta-80: #BB25AC;
  --magenta-90: #A11A95;
  --magenta-100: #831379;
  --magenta-110: #620E5B;
  --magenta-120: #44093E;
  
  /* Purple Palette */
  --purple-10: #F1E7FC;
  --purple-20: #DAC5F8;
  --purple-30: #C29EF5;
  --purple-40: #A973F2;
  --purple-50: #9550EE;
  --purple-60: #8029E9;
  --purple-70: #7423E2;
  --purple-80: #6518DA;
  --purple-90: #550ED4;
  --purple-100: #4E00CC;
  --purple-110: #3200B2;
  --purple-120: #2D00A0;
  
  /* ===== STATUS INDICATORS ===== */
  --status-good: #009855;
  --status-sorta-good: #5AB7CF;
  --status-ambiguous-1: #0182B6;
  --status-ambiguous-2: #9440EE;
  --status-ambiguous-3: #D035C1;
  --status-so-so: #DBA211;
  --status-sorta-bad: #FF7107;
  --status-bad: #CC0000;
  --status-archive-done-off: #6A6C75;
  
  /* ===== DATA VISUALIZATION ===== */
  
  /* Categorical Palettes */
  /* Palette A */
  --dv-palette-a-blue: #4570E0;
  --dv-palette-a-purple: #51209D;
  --dv-palette-a-magenta: #E192E0;
  --dv-palette-a-orange: #F59929;
  --dv-palette-a-teal: #4AB0D0;
  --dv-palette-a-green: #417D4D;
  
  /* Palette B */
  --dv-palette-b-magenta: #791E77;
  --dv-palette-b-blue: #7494E8;
  --dv-palette-b-orange: #D77A0A;
  --dv-palette-b-purple: #8852DC;
  --dv-palette-b-green: #56A667;
  --dv-palette-b-teal: #135A71;
  
  /* Palette C */
  --dv-palette-c-blue: #4570E0;
  --dv-palette-c-purple: #51209D;
  --dv-palette-c-orange: #D77A0A;
  --dv-palette-c-magenta: #CA58C7;
  --dv-palette-c-green: #56A667;
  --dv-palette-c-teal: #4AB0D0;
  
  /* Palette D */
  --dv-palette-d-blue: #1E43A6;
  --dv-palette-d-purple: #8852DC;
  --dv-palette-d-magenta: #E192E0;
  --dv-palette-d-orange: #D77A0A;
  --dv-palette-d-teal: #4AB0D0;
  --dv-palette-d-green: #80BD8D;
  
  /* Diverging Palettes */
  /* Diverging Palette A */
  --dv-diverging-a-teal-120: #2C8AA8;
  --dv-diverging-a-teal-100: #4AB0D0;
  --dv-diverging-a-teal-60: #8AD4EC;
  --dv-diverging-a-neutral-60: #DBD8E9;
  --dv-diverging-a-magenta-60: #E192E0;
  --dv-diverging-a-magenta-100: #CA58C7;
  --dv-diverging-a-magenta-120: #982595;
  
  /* Diverging Palette B */
  --dv-diverging-b-purple-120: #6825D1;
  --dv-diverging-b-purple-100: #8852DC;
  --dv-diverging-b-purple-60: #A77AF0;
  --dv-diverging-b-neutral-60: #DBD8E9;
  --dv-diverging-b-orange-60: #FBB866;
  --dv-diverging-b-orange-100: #F59929;
  --dv-diverging-b-orange-120: #D77A0A;
  
  /* Diverging Palette C */
  --dv-diverging-c-teal-120: #2C8AA8;
  --dv-diverging-c-teal-100: #4AB0D0;
  --dv-diverging-c-teal-60: #8AD4EC;
  --dv-diverging-c-neutral-60: #DBD8E9;
  --dv-diverging-c-orange-60: #FBB866;
  --dv-diverging-c-orange-100: #F59929;
  --dv-diverging-c-orange-120: #D77A0A;
  
  /* Diverging Palette D */
  --dv-diverging-d-blue-120: #1F4BBC;
  --dv-diverging-d-blue-100: #4570E0;
  --dv-diverging-d-blue-60: #7494E8;
  --dv-diverging-d-neutral-60: #DBD8E9;
  --dv-diverging-d-orange-60: #FBB866;
  --dv-diverging-d-orange-100: #F59929;
  --dv-diverging-d-orange-120: #D77A0A;
  
  /* Diverging Palette E */
  --dv-diverging-e-purple-120: #6825D1;
  --dv-diverging-e-purple-100: #8852DC;
  --dv-diverging-e-purple-60: #A77AF0;
  --dv-diverging-e-neutral-60: #DBD8E9;
  --dv-diverging-e-teal-60: #8AD4EC;
  --dv-diverging-e-teal-100: #4AB0D0;
  --dv-diverging-e-teal-120: #2C8AA8;
  
  /* Diverging Palette F */
  --dv-diverging-f-blue-120: #1F4BBC;
  --dv-diverging-f-blue-100: #4570E0;
  --dv-diverging-f-blue-60: #7494E8;
  --dv-diverging-f-neutral-60: #DBD8E9;
  --dv-diverging-f-teal-60: #8AD4EC;
  --dv-diverging-f-teal-100: #4AB0D0;
  --dv-diverging-f-teal-120: #2C8AA8;
  
  /* Diverging Palette G */
  --dv-diverging-g-orange-120: #D77A0A;
  --dv-diverging-g-orange-100: #F59929;
  --dv-diverging-g-orange-60: #FBB866;
  --dv-diverging-g-neutral-60: #DBD8E9;
  --dv-diverging-g-magenta-60: #E192E0;
  --dv-diverging-g-magenta-100: #CA58C7;
  --dv-diverging-g-magenta-120: #982595;
  
  /* NPS Colors */
  --nps-orange-80: #DD4600;
  --nps-yellow-60: #E6AF2D;
  --nps-green-100: #56A667;
  
  /* ===== TYPOGRAPHY ===== */
  
  /* Font Families */
  --font-family-primary: 'Inter', sans-serif;
  --font-family-headings: 'Sora', sans-serif;
  
  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Headings */
  --h1: {
    font-family: 'Sora', sans-serif;
    font-size: 46.184px;
    font-weight: 600;
    line-height: 1.3;
  };
  --h2: {
    font-family: 'Sora', sans-serif;
    font-size: 36.491px;
    font-weight: 600;
    line-height: 1.3;
  };
  --h3: {
    font-family: 'Inter', sans-serif;
    font-size: 22.781px;
    font-weight: 600;
    line-height: 1.3;
  };
  --h4: {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.35;
  };
  --h5: {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.35;
  };
  --h6: {
    font-family: 'Inter', sans-serif;
    font-size: 14.222px;
    font-weight: 600;
    line-height: 1.35;
  };
  
  /* Type Scale */
  --typography-text-preset-18: {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.35;
  };
  --typography-text-preset-16: {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  };
  
  /* Paragraph */
  --paragraph-base-regular: {
    font-family: 'Inter', sans-serif;
    font-size: 14.222px;
    font-weight: 400;
    line-height: 1.5;
  };
  --paragraph-base-semibold: {
    font-family: 'Inter', sans-serif;
    font-size: 14.222px;
    font-weight: 600;
    line-height: 1.5;
  };
  --paragraph-small-regular: {
    font-family: 'Inter', sans-serif;
    font-size: 12.642px;
    font-weight: 400;
    line-height: 1.5;
  };
  --paragraph-small-semibold: {
    font-family: 'Inter', sans-serif;
    font-size: 12.642px;
    font-weight: 600;
    line-height: 1.5;
  };
  
  /* Link */
  --link-base-default: {
    font-family: 'Inter', sans-serif;
    font-size: 14.222px;
    font-weight: 600;
    line-height: 1.5;
    color: #128297;
  };
  --link-base-underline: {
    font-family: 'Inter', sans-serif;
    font-size: 14.222px;
    font-weight: 600;
    line-height: 1.5;
    color: #128297;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    text-decoration-style: solid;
    text-underline-position: from-font;
  };
  --link-small-default: {
    font-family: 'Inter', sans-serif;
    font-size: 12.642px;
    font-weight: 600;
    line-height: 1.5;
    color: #128297;
  };
  --link-small-underline: {
    font-family: 'Inter', sans-serif;
    font-size: 12.642px;
    font-weight: 600;
    line-height: 1.5;
    color: #128297;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    text-decoration-style: solid;
    text-underline-position: from-font;
  };
  
  /* ===== SPACING & LAYOUT ===== */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  
  /* ===== SHADOWS ===== */
  
  /* Drop Shadow Down */
  --shadow-down-depth-1: 0px 1px 1px 0px rgba(0, 0, 0, 0.17);
  --shadow-down-depth-2: 0px 4px 4px 0px rgba(0, 0, 0, 0.17);
  --shadow-down-depth-3: 0px 10px 16px 0px rgba(0, 0, 0, 0.17);
  --shadow-down-depth-4: 0px 13px 28px 0px rgba(0, 0, 0, 0.17);
  
  /* Drop Shadow Up */
  --shadow-up-depth-1: 0px -1px 1px 0px rgba(0, 0, 0, 0.17);
  --shadow-up-depth-2: 0px -2px 6px 0px rgba(0, 0, 0, 0.17);
  --shadow-up-depth-3: 0px -10px 16px 0px rgba(0, 0, 0, 0.17);
  --shadow-up-depth-4: 0px -13px 28px 0px rgba(0, 0, 0, 0.17);
  
  /* Drop Shadow Side */
  --shadow-side-depth-1: 2px 0px 10px 0px rgba(42, 44, 53, 0.17);
} 