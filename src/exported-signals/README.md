# Exported Signals Pages

This folder contains standalone versions of the two layouts:

- `SignalsCardsPage.vue`
- `SignalsInboxPage.vue`
- `SignalsCardsFullPage.vue` (includes page header + Ask Leo input)
- `SignalsInboxFullPage.vue` (includes page header + Ask Leo input)

It also includes:

- `signalsData.js` (layout data)
- `signalsShared.css` (shared styles)
- `index.js` (barrel exports)

## Usage

1. Copy the whole `exported-signals` folder into your target prototype.
2. Make sure your app includes the FY27 design tokens (CSS variables used by these files).
3. Import and render one of the pages:

```js
import {
  SignalsCardsPage,
  SignalsInboxPage,
  SignalsCardsFullPage,
  SignalsInboxFullPage
} from './exported-signals'
```

## Notes

- These exports are dependency-light (no Highcharts required).
- Breakdown bars are rendered with plain HTML/CSS so you can plug them in quickly.
- Full-page variants include a built-in hero/header and Ask Leo input.
- The export uses a local `.signals-export-page` token scope so host design-system styles do not override the FY27 look as easily.
- Components emit `ask-leo` when CTA or prompt submit is used.
