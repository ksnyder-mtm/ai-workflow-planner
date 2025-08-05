/**
 * UI Module for AI Workflow Detective
 * Handles all DOM rendering and UI interactions
 */

class WorkflowDetectiveUI {
    constructor(app) {
        this.app = app;
        this.templates = new WorkflowTemplates();
    }

    /**
     * Render the main application shell
     */
    render() {
        const container = this.app.elements.container;
        container.innerHTML = this.templates.getMainLayout();
        
        // Cache additional elements after rendering
        this.cacheUIElements();
        
        // Render initial content
        this.renderOverview();
    }

    /**
     * Cache UI-specific elements
     */
    cacheUIElements() {
        this.app.elements = {
            ...this.app.elements,
            gameArea: document.querySelector('.game-area'),
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            pointsDisplay: document.getElementById('pointsDisplay'),
            navigation: document.getElementById('navigation'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn')
        };
        
        // Set up global event delegation
        this.setupEventDelegation();
        
        // Set up navigation button events
        this.setupNavigationEvents();
    }

    /**
     * Set up event delegation for dynamically created elements
     */
    setupEventDelegation() {
        document.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (!action) return;
            
            const index = parseInt(e.target.dataset.index);
            const painIndex = parseInt(e.target.dataset.painIndex);
            const solutionIndex = parseInt(e.target.dataset.solutionIndex);
            
            
            switch(action) {
                case 'select-pain':
                    this.app.selectPainPoint(index);
                    break;
                case 'remove-pain':
                    this.app.removePainPoint(index);
                    break;
                case 'remove-solution':
                    this.app.removeSolution(painIndex, solutionIndex);
                    break;
                case 'switch-pain':
                    this.app.switchToPainPoint(index);
                    break;
            }
        });
    }

    /**
     * Set up navigation button events
     */
    setupNavigationEvents() {
        this.bindNavigationButtons();
    }

    /**
     * Bind navigation button events (can be called multiple times safely)
     */
    bindNavigationButtons() {
        // Remove any existing event listeners to prevent duplicates
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (nextBtn) {
            // Clone and replace to remove all event listeners
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
            
            newNextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next button clicked, current level:', this.app.state.currentLevel);
                console.log('Can proceed:', this.app.canProceed());
                this.app.nextLevel();
            });
        }

        if (prevBtn) {
            // Clone and replace to remove all event listeners
            const newPrevBtn = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
            
            newPrevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Previous button clicked');
                this.app.previousLevel();
            });
        }
    }

    /**
     * Render overview/welcome screen
     */
    renderOverview() {
        const level = document.getElementById('overview');
        if (!level) return;

        level.innerHTML = this.templates.getOverviewContent();
        
        // Bind start button
        const startBtn = level.querySelector('.start-detective-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.app.startDetectiveWork());
        }
    }

    /**
     * Render workflow selection level
     */
    renderWorkflowLevel() {
        const level = document.getElementById('level1');
        if (!level) return;

        const workflows = Object.entries(this.app.workflowData).map(([key, data]) => ({
            id: key,
            ...data,
            points: this.app.config.points.workflowSelect
        }));

        workflows.push({
            id: 'custom',
            title: 'Something Else',
            icon: '✨',
            description: 'Create your own workflow to analyze',
            points: this.app.config.points.customWorkflow
        });

        level.innerHTML = this.templates.getWorkflowLevel(workflows);
        
        // Bind workflow selection events
        this.bindWorkflowEvents();
    }

    /**
     * Bind workflow selection events
     */
    bindWorkflowEvents() {
        // Workflow cards
        document.querySelectorAll('.workflow-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const workflow = card.dataset.workflow;
                this.app.selectWorkflow(workflow, card);
            });
        });

        // Example clicks
        document.querySelectorAll('.example-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const example = e.target.dataset.example;
                this.selectExample(example);
            });
        });

        // Custom workflow input
        const customInput = document.getElementById('customWorkflowInput');
        if (customInput) {
            customInput.addEventListener('input', (e) => {
                this.app.state.customWorkflow = e.target.value.trim();
                this.app.updateNavigation();
            });
        }
    }

    /**
     * Select workflow example
     */
    selectExample(example) {
        const exampleMap = {
            'meetings': 'meetings',
            'communication': 'communication',
            'data': 'data'
        };

        const workflow = exampleMap[example];
        if (workflow) {
            const card = document.querySelector(`[data-workflow="${workflow}"]`);
            if (card) {
                this.app.selectWorkflow(workflow, card);
            }
        }
    }

    /**
     * Render pain points level
     */
    renderPainPointsLevel() {
        const level = document.getElementById('level2');
        if (!level) return;

        const workflowTitle = this.getWorkflowTitle();
        const examples = this.getPainPointExamples();

        level.innerHTML = this.templates.getPainPointsLevel(workflowTitle, examples);
        
        // Bind pain point events
        this.bindPainPointEvents();
        
        // Render existing pain points
        this.updatePainPointsList();
    }

    /**
     * Get current workflow title
     */
    getWorkflowTitle() {
        const { selectedWorkflow, customWorkflow } = this.app.state;
        if (selectedWorkflow === 'custom') {
            return customWorkflow || 'Custom Workflow';
        }
        return this.app.workflowData[selectedWorkflow]?.title || 'Selected Workflow';
    }

    /**
     * Get pain point examples for current workflow
     */
    getPainPointExamples() {
        const { selectedWorkflow } = this.app.state;
        if (selectedWorkflow === 'custom') {
            return [];
        }
        return this.app.workflowData[selectedWorkflow]?.examples || [];
    }

    /**
     * Bind pain point events
     */
    bindPainPointEvents() {
        // Add pain point button
        const addBtn = document.querySelector('.add-pain-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.app.addPainPoint());
        }

        // Pain point input
        const input = document.getElementById('painPointInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.app.addPainPoint();
                }
            });
        }
    }

    /**
     * Update pain points display
     */
    updatePainPointsList() {
        const list = document.getElementById('painPointList');
        if (!list) return;

        const { painPoints, currentPainPointIndex } = this.app.state;
        
        list.innerHTML = painPoints.map((point, index) => {
            const isSelected = currentPainPointIndex === index;
            return this.templates.getPainPointItem(point, index, isSelected);
        }).join('');

        // Update selected pain point section
        const selectedSection = document.getElementById('selectedPainPointSection');
        const selectedText = document.getElementById('selectedPainPointText');
        
        if (currentPainPointIndex >= 0 && selectedSection && selectedText) {
            selectedSection.style.display = 'block';
            selectedText.textContent = painPoints[currentPainPointIndex].text;
        } else if (selectedSection) {
            selectedSection.style.display = 'none';
        }
        
        // Update navigation after pain point list changes
        this.app.updateNavigation();
    }

    /**
     * Render solutions level
     */
    renderSolutionsLevel() {
        const level = document.getElementById('level3');
        if (!level) return;

        const { painPoints, currentPainPointIndex } = this.app.state;
        const focusedPain = painPoints[currentPainPointIndex];
        
        level.innerHTML = this.templates.getSolutionsLevel(
            focusedPain,
            this.app.aiCapabilities
        );

        // Set up solutions container
        this.setupSolutionsContainer();
        
        // Bind drag and drop
        this.setupDragAndDrop();
        
        // Update remaining pain points
        this.updateRemainingPainPoints();
    }

    /**
     * Set up solutions container for current pain point
     */
    setupSolutionsContainer() {
        const container = document.getElementById('solutionsContainer');
        if (!container) return;

        const { currentPainPointIndex } = this.app.state;
        container.innerHTML = this.templates.getSolutionBuilder(currentPainPointIndex);

        // Initialize solutions array if needed
        if (!this.app.state.solutions[currentPainPointIndex]) {
            this.app.state.solutions[currentPainPointIndex] = [];
        }

        // Update solutions list
        this.updateSolutionsList(currentPainPointIndex);

        // Bind solution events
        this.bindSolutionEvents(currentPainPointIndex);
    }

    /**
     * Bind solution-related events
     */
    bindSolutionEvents(painPointIndex) {
        // Add solution button
        const addBtn = document.querySelector(`#solutionContainer${painPointIndex} .add-solution-btn`);
        if (addBtn) {
            addBtn.addEventListener('click', () => this.app.addSolution(painPointIndex));
        }

        // Solution textarea
        const textarea = document.getElementById(`solution${painPointIndex}`);
        if (textarea) {
            textarea.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && e.shiftKey) {
                    e.preventDefault();
                    this.app.addSolution(painPointIndex);
                }
            });
        }

        // Save tools button
        const saveToolsBtn = document.querySelector(`#toolsSection${painPointIndex} .save-tools-btn`);
        if (saveToolsBtn) {
            saveToolsBtn.addEventListener('click', () => this.app.saveTools(painPointIndex));
        }
    }

    /**
     * Update solutions list display
     */
    updateSolutionsList(painPointIndex) {
        const list = document.getElementById(`solutionsList${painPointIndex}`);
        if (!list) return;

        const solutions = this.app.state.solutions[painPointIndex] || [];
        
        if (solutions.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: #999; margin: 20px 0;">No solutions yet - drag AI capabilities here or type your own below</p>';
        } else {
            list.innerHTML = solutions.map((solution, index) => {
                // Handle both string and object formats for backward compatibility
                const solutionText = typeof solution === 'string' ? solution : solution.text;
                const solutionType = typeof solution === 'object' ? solution.type : 'unknown';
                return this.templates.getSolutionItem(solutionText, painPointIndex, index, solutionType);
            }).join('');
        }

        // Show tools section if solutions exist
        const toolsSection = document.getElementById(`toolsSection${painPointIndex}`);
        if (toolsSection && solutions.length > 0) {
            toolsSection.style.display = 'block';
        }
    }

    /**
     * Update remaining pain points display
     */
    updateRemainingPainPoints() {
        const container = document.getElementById('remainingPainPoints');
        if (!container) return;

        const { painPoints, currentPainPointIndex, solutions } = this.app.state;
        const remainingPainPoints = painPoints.filter((_, index) => index !== currentPainPointIndex);
        
        if (remainingPainPoints.length === 0) {
            container.innerHTML = '<p style="color: #666; font-style: italic;">All pain points addressed! 🎉</p>';
            return;
        }
        
        container.innerHTML = remainingPainPoints.map((point, index) => {
            const originalIndex = painPoints.findIndex(p => p === point);
            const hasSolutions = solutions[originalIndex] && solutions[originalIndex].length > 0;
            return this.templates.getRemainingPainPointItem(point, originalIndex, hasSolutions);
        }).join('');
    }

    /**
     * Set up drag and drop functionality
     */
    setupDragAndDrop() {
        const capabilities = document.querySelectorAll('.ai-capability');
        
        capabilities.forEach(cap => {
            cap.addEventListener('dragstart', this.app.boundHandlers.handleDragStart);
            cap.addEventListener('dragend', this.app.boundHandlers.handleDragEnd);
        });

        const dropZone = document.querySelector('.solution-builder');
        if (dropZone) {
            dropZone.addEventListener('dragover', this.app.boundHandlers.handleDragOver);
            dropZone.addEventListener('dragleave', this.app.boundHandlers.handleDragLeave);
            dropZone.addEventListener('drop', (e) => {
                this.app.boundHandlers.handleDrop(e, this.app.state.currentPainPointIndex);
            });
        }
    }

    /**
     * Render results screen
     */
    renderResults() {
        const level = document.getElementById('results');
        if (!level) return;

        const { earnedBadges, selectedWorkflow, customWorkflow, painPoints, solutions } = this.app.state;
        
        // Build workflow summary
        const workflowSummary = this.buildWorkflowSummary();
        
        level.innerHTML = this.templates.getResultsLevel(
            0, // totalPoints removed
            '', // scoreMessage removed
            workflowSummary,
            earnedBadges
        );

        // Bind results events
        this.bindResultsEvents();
    }

    /**
     * Get score message based on points
     * @deprecated Points system removed
     */
    getScoreMessage(points) {
        return '';
    }

    /**
     * Build workflow summary for results
     */
    buildWorkflowSummary() {
        const { selectedWorkflow, customWorkflow, painPoints, solutions, existingTools, neededTools } = this.app.state;
        const workflowTitle = selectedWorkflow === 'custom' ? customWorkflow : this.app.workflowData[selectedWorkflow]?.title;
        
        return {
            workflow: workflowTitle,
            painPoints: painPoints.map((point, index) => ({
                text: point.text,
                solutions: solutions[index] || [],
                existingTools: existingTools[index] || '',
                neededTools: neededTools[index] || ''
            }))
        };
    }

    /**
     * Bind results screen events
     */
    bindResultsEvents() {
        // Download PDF button
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.app.exportPlan());
        }

        // Reset button
        const resetBtn = document.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to start over? Your current progress will be lost.')) {
                    this.app.reset();
                }
            });
        }
    }
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkflowDetectiveUI;
} else {
    window.WorkflowDetectiveUI = WorkflowDetectiveUI;
}