/**
 * Drag and Drop Handler Module for AI Workflow Detective
 * Manages all drag and drop interactions
 */

class DragDropHandler {
    /**
     * Handle drag start event
     */
    static handleDragStart(e) {
        const capability = e.target.dataset.capability;
        const heading = e.target.querySelector('h4');
        const description = e.target.querySelector('p');
        
        if (capability && heading && description) {
            e.dataTransfer.setData('capability', capability);
            e.dataTransfer.setData('text', `${heading.textContent}: ${description.textContent}`);
            e.target.classList.add('dragging');
        }
    }

    /**
     * Handle drag end event
     */
    static handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    /**
     * Handle drag over event
     */
    static handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }

    /**
     * Handle drag leave event
     */
    static handleDragLeave(e) {
        // Only remove class if we're leaving the drop zone entirely
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('drag-over');
        }
    }

    /**
     * Handle drop event
     */
    static handleDrop(app, e, painPointIndex) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const text = e.dataTransfer.getData('text');
        
        if (text) {
            // Initialize solutions array if needed
            if (!app.state.solutions[painPointIndex]) {
                app.state.solutions[painPointIndex] = [];
            }
            
            // Check if solution already exists
            const existingSolution = app.state.solutions[painPointIndex].find(sol => 
                (typeof sol === 'string' && sol === text) || 
                (typeof sol === 'object' && sol.text === text)
            );
            
            if (!existingSolution) {
                // Store as object with type
                app.state.solutions[painPointIndex].push({
                    text: text,
                    type: 'ai-suggested',
                    timestamp: Date.now()
                });
                
                // Update UI
                if (app.ui) {
                    app.ui.updateSolutionsList(painPointIndex);
                    app.ui.updateRemainingPainPoints();
                }
                
                app.updateNavigation();
                app.updatePoints(app.config.points.solutionAdd, 'AI solution added!');
                
                // Check for badge
                const totalSolutions = Object.values(app.state.solutions).flat().length;
                if (totalSolutions === 3 && !app.state.earnedBadges.includes('badge-solution')) {
                    app.earnBadge('badge-solution');
                }
                
                app.showNotification('AI capability added to solution!', 'success');
            } else {
                app.showNotification('This capability is already added', 'error');
            }
        }
    }

    /**
     * Make an element keyboard accessible for drag operations
     */
    static makeKeyboardAccessible(element, app) {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.setAttribute('aria-grabbed', 'false');
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.simulateSelection(element, app);
            }
        });
    }

    /**
     * Simulate selection for keyboard users
     */
    static simulateSelection(element, app) {
        const capability = element.dataset.capability;
        const heading = element.querySelector('h4');
        const description = element.querySelector('p');
        
        if (capability && heading && description && app.state.currentPainPointIndex >= 0) {
            const text = `${heading.textContent}: ${description.textContent}`;
            const painPointIndex = app.state.currentPainPointIndex;
            
            // Initialize solutions array if needed
            if (!app.state.solutions[painPointIndex]) {
                app.state.solutions[painPointIndex] = [];
            }
            
            // Add solution if not already present
            const existingSolution = app.state.solutions[painPointIndex].find(sol => 
                (typeof sol === 'string' && sol === text) || 
                (typeof sol === 'object' && sol.text === text)
            );
            
            if (!existingSolution) {
                // Store as object with type
                app.state.solutions[painPointIndex].push({
                    text: text,
                    type: 'ai-suggested',
                    timestamp: Date.now()
                });
                
                // Update UI
                if (app.ui) {
                    app.ui.updateSolutionsList(painPointIndex);
                    app.ui.updateRemainingPainPoints();
                }
                
                app.updateNavigation();
                app.updatePoints(app.config.points.solutionAdd, 'AI solution added!');
                
                // Visual feedback
                element.classList.add('selected');
                setTimeout(() => {
                    element.classList.remove('selected');
                }, 1000);
                
                app.showNotification('AI capability added to solution!', 'success');
            }
        }
    }

    /**
     * Initialize drag and drop for all capabilities
     */
    static initializeDragDrop(app) {
        const capabilities = document.querySelectorAll('.ai-capability');
        
        capabilities.forEach(cap => {
            // Mouse/touch drag events
            cap.addEventListener('dragstart', (e) => this.handleDragStart(e));
            cap.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            // Keyboard accessibility
            this.makeKeyboardAccessible(cap, app);
        });

        // Set up drop zones
        const dropZones = document.querySelectorAll('.solution-builder');
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            zone.addEventListener('drop', (e) => {
                const painPointIndex = parseInt(zone.id.replace('solutionBuilder', ''));
                this.handleDrop(app, e, painPointIndex);
            });
        });
    }
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DragDropHandler;
} else {
    window.DragDropHandler = DragDropHandler;
}