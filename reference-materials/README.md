# Reference Materials

## Observable Notebook Archive

This directory contains reference materials from the official D3 Observable zoomable icicle implementation.

### Files:
- `zoomable-icicle.tgz` - Official D3 Observable zoomable icicle notebook

### ⚠️ Important Warning:
**DO NOT extract these files in the main dashboard directory!**

Extracting Observable files in the main directory will overwrite:
- `index.html` (dashboard entry point)
- `package.json` (dashboard scripts)
- Other essential dashboard files

### Safe Usage:
If you need to examine the Observable source code:
1. Extract in a separate directory outside the dashboard
2. Or extract in a temporary folder
3. Study the implementation and adapt patterns to our React components

### Current Implementation:
Our dashboard already includes a working zoomable icicle chart that incorporates the best patterns from this Observable reference while maintaining compatibility with our React/Vite setup. 