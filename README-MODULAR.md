# AI Workflow Detective - Modular Edition

A completely refactored, modular version of the AI Workflow Detective tool. This version separates concerns into reusable modules, making the codebase more maintainable and customizable.

## 🏗️ Architecture Overview

The application is now built with a modular architecture that separates concerns:

```
├── index-modular.html          # Main HTML file (lightweight)
├── css/
│   └── styles.css             # Complete stylesheet
├── js/
│   ├── AIWorkflowDetective.js # Main application class
│   ├── config.js              # Configuration and customization
│   └── modules/
│       ├── UI.js              # UI rendering and DOM management
│       ├── Templates.js       # HTML template generation
│       ├── WorkflowMethods.js # Business logic for workflows
│       └── DragDropHandler.js # Drag & drop functionality
```

## 🌟 Key Improvements

### 1. **Modular Architecture**
- **Separation of Concerns**: UI, business logic, templates, and configuration are separate
- **Reusable Components**: Each module can be easily modified or replaced
- **Clean Dependencies**: Clear module boundaries with well-defined APIs

### 2. **Configuration System**
- **Centralized Config**: All settings in `config.js` for easy customization
- **Feature Flags**: Enable/disable functionality without code changes
- **Theme Customization**: Colors, animations, and UI behavior
- **Content Management**: Easy to update workflows, AI capabilities, and messaging

### 3. **Enhanced Developer Experience**
- **Error Handling**: Proper error boundaries and validation
- **Debugging**: Better console logging and state inspection
- **Type Safety**: Clear interfaces and parameter validation
- **Documentation**: Comprehensive inline documentation

### 4. **Better User Experience**
- **Accessibility**: Keyboard navigation and ARIA labels
- **Performance**: Optimized DOM updates and event handling
- **Responsiveness**: Mobile-first design improvements
- **Animations**: Smooth transitions and feedback

## 🚀 Getting Started

### Basic Usage
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div id="app"></div>
    
    <!-- Load modules in order -->
    <script src="js/config.js"></script>
    <script src="js/modules/Templates.js"></script>
    <script src="js/modules/UI.js"></script>
    <script src="js/modules/WorkflowMethods.js"></script>
    <script src="js/modules/DragDropHandler.js"></script>
    <script src="js/AIWorkflowDetective.js"></script>
    
    <script>
        const app = new AIWorkflowDetective();
        app.init();
    </script>
</body>
</html>
```

### Custom Configuration
```javascript
const config = {
    points: {
        workflowSelect: 15,  // Custom point values
        painPointAdd: 8
    },
    theme: {
        primary: '#2c3e50',  // Custom colors
        accent: '#e74c3c'
    },
    features: {
        enableBadges: false,  // Disable gamification
        enableExport: true
    }
};

const app = new AIWorkflowDetective(config);
app.init();
```

## 📦 Module Details

### AIWorkflowDetective.js (Main Class)
The core application class that manages state and coordinates between modules.

**Key Methods:**
- `init()` - Initialize the application
- `showLevel(level)` - Navigate between levels
- `updatePoints(points, reason)` - Award points and show notifications
- `getAPI()` - Get public API for external integration

### UI.js (User Interface)
Handles all DOM manipulation and rendering.

**Key Methods:**
- `render()` - Render main application shell  
- `renderWorkflowLevel()` - Display workflow selection
- `renderPainPointsLevel()` - Display pain point identification
- `renderSolutionsLevel()` - Display AI solutions interface
- `renderResults()` - Display final results and export

### Templates.js (HTML Templates)
Contains all HTML template strings for dynamic content generation.

**Key Methods:**
- `getMainLayout()` - Application shell template
- `getWorkflowLevel(workflows)` - Workflow selection interface
- `getPainPointsLevel(title, examples)` - Pain point identification
- `getSolutionsLevel(pain, capabilities)` - Solutions design interface

### WorkflowMethods.js (Business Logic)
Contains all workflow-specific business logic and state management.

**Key Methods:**
- `selectWorkflow(app, workflow, element)` - Handle workflow selection
- `addPainPoint(app)` - Add pain point to list
- `addSolution(app, painPointIndex)` - Add AI solution
- `exportPlan(app)` - Generate PDF export

### DragDropHandler.js (Drag & Drop)
Manages drag and drop interactions with keyboard accessibility.

**Key Methods:**
- `handleDragStart(e)` - Start drag operation
- `handleDrop(app, e, painPointIndex)` - Handle solution drop
- `makeKeyboardAccessible(element, app)` - Add keyboard support

### config.js (Configuration)
Centralized configuration for easy customization.

**Key Sections:**
- `points` - Point values for different actions
- `workflows` - Workflow definitions and examples
- `aiCapabilities` - Available AI capabilities
- `theme` - Color scheme and styling
- `features` - Feature flags for functionality

## 🎨 Customization Guide

### Adding New Workflows
```javascript
// In config.js
workflows: {
    myWorkflow: {
        title: "Custom Workflow",
        icon: "⚡",
        description: "Description of the workflow",
        examples: [
            "Example pain point 1",
            "Example pain point 2"
        ],
        aiSuggestions: [
            "AI solution 1",
            "AI solution 2"
        ]
    }
}
```

### Adding New AI Capabilities
```javascript
// In config.js
aiCapabilities: [
    {
        id: 'custom',
        name: 'Custom AI Tool',
        icon: '🤖',
        description: 'What this AI tool does',
        category: 'Tool Category'
    }
]
```

### Customizing Points System
```javascript
// In config.js
points: {
    workflowSelect: 20,      // Points for selecting workflow
    painPointAdd: 10,        // Points for adding pain point
    solutionAdd: 15,         // Points for adding solution
    completionBonus: 100     // Bonus for completion
}
```

### Theme Customization
```javascript
// In config.js
theme: {
    primary: '#your-color',     // Main brand color
    secondary: '#your-color',   // Secondary brand color
    accent: '#your-color',      // Accent color
    background: '#your-color'   // Background color
}
```

## 🔧 API Reference

### Public Methods
```javascript
const app = new AIWorkflowDetective();

// Initialize the application
app.init();

// Get current state
const state = app.getAPI().getState();

// Set workflow programmatically
app.getAPI().setWorkflow('meetings');

// Add pain point programmatically
app.getAPI().addPainPoint('Manual data entry');

// Export current plan
app.getAPI().exportPlan();

// Reset application
app.getAPI().reset();
```

### Events and Callbacks
```javascript
// Listen for state changes
app.on('stateChange', (newState) => {
    console.log('State updated:', newState);
});

// Listen for level completion
app.on('levelComplete', (level) => {
    console.log('Completed level:', level);
});
```

## 🧪 Testing

### Unit Testing Example
```javascript
// Test workflow selection
const app = new AIWorkflowDetective();
app.init();

app.selectWorkflow('meetings');
assert.equal(app.state.selectedWorkflow, 'meetings');
assert.equal(app.state.totalPoints, 10);
```

### Integration Testing
```javascript
// Test full workflow
const app = new AIWorkflowDetective();
app.init();

// Complete a full workflow
app.selectWorkflow('meetings');
app.addPainPoint('Too many meetings');
app.selectPainPoint(0);
app.addSolution(0, 'AI meeting summarization');

// Verify final state
assert.equal(app.state.solutions[0].length, 1);
assert.isTrue(app.state.totalPoints > 20);
```

## 🚀 Deployment

### Simple Deployment
1. Upload all files to web server
2. Ensure proper MIME types for .js files
3. Access `index-modular.html`

### CDN Integration
```html
<!-- Use CDN for external libraries -->
<script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
```

### Build Process Integration
```javascript
// webpack.config.js example
module.exports = {
    entry: './js/AIWorkflowDetective.js',
    output: {
        filename: 'ai-workflow-detective.bundle.js',
        library: 'AIWorkflowDetective',
        libraryTarget: 'umd'
    }
};
```

## 🤝 Contributing

### Development Setup
1. Clone the repository
2. Open `index-modular.html` in a web browser
3. Make changes to modules
4. Test in browser console

### Code Style
- Use ES6+ features
- Follow JSDoc documentation format
- Use descriptive variable names
- Separate concerns into appropriate modules

### Adding Features
1. Update configuration in `config.js`
2. Add UI templates in `Templates.js`
3. Implement logic in appropriate module
4. Update documentation

## 📄 License

MIT License - feel free to adapt for educational and nonprofit use.

## 🏢 About

This modular version maintains all the functionality of the original AI Workflow Detective while providing a much more maintainable and customizable codebase. Perfect for organizations that want to adapt the tool for their specific needs or integrate it into larger systems.

---

**Ready to customize your AI Detective experience?** 
Start by modifying `config.js` and see your changes come to life!