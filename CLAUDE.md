# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Workflow Planner is a gamified learning tool for nonprofits to identify AI enhancement opportunities. It's a client-side web application built with vanilla JavaScript, requiring no build process or backend.

## Architecture

The codebase follows a modular architecture:

- **AIWorkflowDetective.js**: Main application class managing state, user interactions, and orchestrating modules
- **Modules** (js/modules/):
  - `UI.js`: DOM manipulation and rendering logic
  - `WorkflowMethods.js`: Business logic for workflow analysis and COMPAS framework
  - `DragDropHandler.js`: Drag-and-drop functionality for AI capabilities
  - `Templates.js`: HTML template generation
- **config.js**: Centralized configuration for customization (points, badges, content)

The application uses event delegation for dynamic content and maintains state in the main class instance.

## Development Commands

No build process or package manager is used. To develop:

1. **Run locally**: Open `index.html` or `index-modular.html` directly in a browser or use a local server:
   ```bash
   python3 -m http.server 8000
   # or
   npx http-server
   ```

2. **Test**: Open test-*.html files in browser for manual testing

3. **Deploy**: Upload files directly to web server (static hosting)

## Key Considerations

- **Browser-only**: All code runs client-side; no Node.js APIs available
- **External dependencies**: jsPDF and html2canvas loaded via CDN
- **Customization**: Modify `config.js` for points, badges, and content changes
- **Entry points**: 
  - `index.html`: Original single-file version
  - `index-modular.html`: Modular architecture version (preferred for development)
- **COMPAS framework**: Core methodology - Context, Objective, Method, Performance, Assessment, Super You

## Workflow System

The application guides users through:
1. Describing nonprofit workflows
2. Analyzing them using COMPAS framework
3. Assigning AI capabilities via drag-and-drop
4. Generating recommendations and earning badges
5. Exporting results as PDF

## Visual Style - Current & Target

### Current State
- Uses gradients heavily throughout interface
- Frequent emoji usage in UI elements
- Use of animated emojis

### Target Direction
- **Reduce gradients** - prefer solid colors and subtle transitions
- **Selective emoji use** - include sparingly for warmth, not decoration
- **Cleaner, more professional aesthetic** aligned with MTM brand
- **Brand colors** - #1ab1d2, #f18f38, #fef4e3, #1c487b, #85abbd


### Implementation Notes
- Transition existing components to new style as instructed
- Maintain accessibility standards throughout changes

##Browser Application Standards&##
- Client-side focused - all processing happens in the user's browser
- No data persistence - applications don't store or transmit user data
- Privacy by design - users maintain full control of their information
- Offline capable when possible - tools work without internet connectivity
- Fast loading and responsive - immediate usability for busy nonprofit staff
- Cross-browser compatibility - works reliably across different browsers and devices
- Progressive enhancement - core functionality works even with limited browser features
- Clear user feedback - immediate visual confirmation of actions and results
