/**
 * AI Workflow Detective - Main Application Module
 * A gamified tool for nonprofits to identify AI enhancement opportunities
 */

class AIWorkflowDetective {
    constructor(config = {}) {
        // Configuration
        this.config = {
            containerSelector: '#app',
            points: {
                workflowSelect: 10,
                customWorkflow: 15,
                painPointAdd: 5,
                painPointSelect: 10,
                solutionAdd: 10,
                toolsSave: 5,
                badgeEarn: 20
            },
            animations: {
                duration: 300,
                notificationDuration: 3000
            },
            ...config
        };

        // Application state
        this.state = {
            currentLevel: 0,
            selectedWorkflow: '',
            customWorkflow: '',
            painPoints: [],
            currentPainPointIndex: -1,
            solutions: {},
            existingTools: {},
            neededTools: {},
            totalPoints: 0,
            earnedBadges: []
        };

        // Workflow data
        this.workflowData = {
            meetings: {
                title: "Meeting Management",
                icon: "📋",
                description: "Planning, running, and following up on meetings",
                examples: [
                    "Taking notes while facilitating",
                    "Remembering to follow up on action items",
                    "Scheduling with multiple people",
                    "Writing meeting agendas from scratch",
                    "Tracking decisions across meetings"
                ],
                aiExamples: [
                    "AI meeting transcription",
                    "Automated action item extraction",
                    "Smart scheduling assistants",
                    "Meeting agenda templates",
                    "Decision tracking database"
                ]
            },
            communication: {
                title: "Communication & Outreach",
                icon: "📧",
                description: "Emails, newsletters, social media, donor communications",
                examples: [
                    "Writing similar emails repeatedly",
                    "Personalizing mass communications",
                    "Managing social media content",
                    "Translating materials",
                    "Responding to common questions"
                ],
                aiExamples: [
                    "Email template generation",
                    "Mail merge with personalization",
                    "Social media content calendar",
                    "Auto-translation tools",
                    "FAQ chatbot"
                ]
            },
            data: {
                title: "Data Collection & Analysis",
                icon: "📊",
                description: "Surveys, reports, program evaluation, grant reporting",
                examples: [
                    "Manually organizing survey responses",
                    "Creating charts from spreadsheets",
                    "Writing summary reports",
                    "Finding patterns in feedback",
                    "Cleaning messy data"
                ],
                aiExamples: [
                    "Survey response summarization",
                    "Automated chart generation",
                    "Report draft creation",
                    "Pattern recognition",
                    "Data cleaning tools"
                ]
            },
            admin: {
                title: "Administrative Tasks",
                icon: "📁",
                description: "Scheduling, file organization, volunteer coordination",
                examples: [
                    "Coordinating volunteer schedules",
                    "Organizing digital files",
                    "Tracking program attendance",
                    "Managing contact databases",
                    "Creating routine documents"
                ],
                aiExamples: [
                    "Volunteer scheduling system",
                    "Smart file organization",
                    "Attendance tracking app",
                    "CRM integration",
                    "Document templates"
                ]
            },
            fundraising: {
                title: "Fundraising & Grants",
                icon: "💝",
                description: "Grant writing, donor research, event planning",
                examples: [
                    "Researching potential donors",
                    "Tracking grant deadlines",
                    "Writing thank you letters",
                    "Creating fundraising reports",
                    "Finding relevant grants"
                ],
                aiExamples: [
                    "Donor research tools",
                    "Grant calendar automation",
                    "Thank you letter generator",
                    "Impact report builder",
                    "Grant matching service"
                ]
            }
        };

        // AI capabilities
        this.aiCapabilities = [
            {
                id: 'summarize',
                name: 'Summarizing',
                icon: '📝',
                description: 'Condense long documents, meeting notes, or emails'
            },
            {
                id: 'draft',
                name: 'Drafting',
                icon: '✍️',
                description: 'Create first drafts of emails, reports, or proposals'
            },
            {
                id: 'analyze',
                name: 'Analyzing',
                icon: '📊',
                description: 'Find patterns in data, feedback, or survey responses'
            },
            {
                id: 'organize',
                name: 'Organizing',
                icon: '🗂️',
                description: 'Categorize information, create structure from chaos'
            },
            {
                id: 'translate',
                name: 'Translating',
                icon: '🌐',
                description: 'Convert content between languages or simplify jargon'
            },
            {
                id: 'brainstorm',
                name: 'Brainstorming',
                icon: '💡',
                description: 'Generate ideas, solutions, or creative approaches'
            }
        ];

        // DOM element cache
        this.elements = {};
        
        // Event handlers will be bound during initialization
    }

    /**
     * Initialize the application
     */
    init() {
        // Initialize UI module
        this.ui = new WorkflowDetectiveUI(this);
        
        // Bind workflow methods
        this.startDetectiveWork = () => WorkflowMethods.startDetectiveWork(this);
        this.selectWorkflow = (workflow, element) => WorkflowMethods.selectWorkflow(this, workflow, element);
        this.addPainPoint = () => WorkflowMethods.addPainPoint(this);
        this.selectPainPoint = (index) => WorkflowMethods.selectPainPoint(this, index);
        this.removePainPoint = (index) => WorkflowMethods.removePainPoint(this, index);
        this.addSolution = (painPointIndex, solutionText) => WorkflowMethods.addSolution(this, painPointIndex, solutionText);
        this.removeSolution = (painPointIndex, solutionIndex) => WorkflowMethods.removeSolution(this, painPointIndex, solutionIndex);
        this.saveTools = (painPointIndex) => WorkflowMethods.saveTools(this, painPointIndex);
        this.switchToPainPoint = (index) => WorkflowMethods.switchToPainPoint(this, index);
        this.setupSolutionsLevel = () => WorkflowMethods.setupSolutionsLevel(this);
        this.setupResults = () => WorkflowMethods.setupResults(this);
        this.exportPlan = () => WorkflowMethods.exportPlan(this);
        
        // Bind drag drop handlers
        this.handleDragStart = (e) => DragDropHandler.handleDragStart(e);
        this.handleDragEnd = (e) => DragDropHandler.handleDragEnd(e);
        this.handleDragOver = (e) => DragDropHandler.handleDragOver(e);
        this.handleDragLeave = (e) => DragDropHandler.handleDragLeave(e);
        this.handleDrop = (e, painPointIndex) => DragDropHandler.handleDrop(this, e, painPointIndex);
        
        // Create bound handlers object for easy reference
        this.boundHandlers = {
            handleDragStart: this.handleDragStart,
            handleDragEnd: this.handleDragEnd,
            handleDragOver: this.handleDragOver,
            handleDragLeave: this.handleDragLeave,
            handleDrop: this.handleDrop
        };
        
        this.cacheElements();
        this.render();
        this.bindGlobalEvents();
        this.showLevel(0);
        return this;
    }

    /**
     * Cache frequently used DOM elements
     */
    cacheElements() {
        const container = document.querySelector(this.config.containerSelector);
        if (!container) {
            throw new Error(`Container ${this.config.containerSelector} not found`);
        }

        this.elements = {
            container,
            notification: document.getElementById('notification') || this.createNotificationElement()
        };
    }

    /**
     * Create notification element if it doesn't exist
     */
    createNotificationElement() {
        const notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
        return notification;
    }

    /**
     * Bind global event listeners
     */
    bindGlobalEvents() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && this.canProceed()) {
                this.nextLevel();
            } else if (e.key === 'ArrowLeft' && this.state.currentLevel > 0) {
                this.previousLevel();
            }
        });
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'success') {
        const notification = this.elements.notification;
        notification.textContent = message;
        notification.className = 'notification show';
        
        if (type === 'error') notification.classList.add('error');
        if (type === 'achievement') notification.classList.add('achievement');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, this.config.animations.notificationDuration);
    }

    /**
     * Update points and show notification
     */
    updatePoints(points, reason) {
        this.state.totalPoints += points;
        
        const pointsDisplay = document.getElementById('pointsDisplay');
        if (pointsDisplay) {
            pointsDisplay.textContent = this.state.totalPoints;
        }
        
        if (points > 0) {
            this.showNotification(`+${points} points: ${reason}`, 'achievement');
        }
    }

    /**
     * Award a badge
     */
    earnBadge(badgeId) {
        if (!this.state.earnedBadges.includes(badgeId)) {
            this.state.earnedBadges.push(badgeId);
            
            const badgeElement = document.getElementById(badgeId);
            if (badgeElement) {
                badgeElement.classList.add('earned');
            }
            
            this.showNotification('🏅 New badge earned!', 'achievement');
            this.updatePoints(this.config.points.badgeEarn, 'Badge earned!');
        }
    }

    /**
     * Navigate to next level
     */
    nextLevel() {
        console.log('nextLevel() called, current level:', this.state.currentLevel);
        console.log('Current state:', JSON.stringify(this.state, null, 2));
        
        // Validate current level before proceeding
        if (!this.validateCurrentLevel()) {
            console.log('Validation failed, not proceeding');
            return;
        }

        console.log('Validation passed, proceeding to next level');

        // Handle level-specific logic
        switch (this.state.currentLevel) {
            case 1:
                if (this.state.selectedWorkflow === 'custom') {
                    const input = document.getElementById('customWorkflowInput');
                    this.state.customWorkflow = input ? input.value.trim() : '';
                }
                break;
            case 2:
                console.log('Setting up solutions level');
                this.setupSolutionsLevel();
                break;
            case 3:
                console.log('Setting up results');
                this.setupResults();
                break;
        }

        this.state.currentLevel++;
        console.log('Moving to level:', this.state.currentLevel);
        this.showLevel(this.state.currentLevel);
        this.updateProgress();
    }

    /**
     * Navigate to previous level
     */
    previousLevel() {
        if (this.state.currentLevel > 0) {
            this.state.currentLevel--;
            this.showLevel(this.state.currentLevel);
            this.updateProgress();
        }
    }

    /**
     * Show specific level
     */
    showLevel(level) {
        // Hide all levels
        document.querySelectorAll('.level').forEach(el => {
            el.classList.remove('active');
        });

        // Show current level
        const levelMap = ['overview', 'level1', 'level2', 'level3', 'results'];
        const currentLevelId = levelMap[level];
        const currentLevelElement = document.getElementById(currentLevelId);
        
        if (currentLevelElement) {
            currentLevelElement.classList.add('active');
        }

        // Render content for current level
        if (this.ui) {
            switch(level) {
                case 0:
                    this.ui.renderOverview();
                    break;
                case 1:
                    this.ui.renderWorkflowLevel();
                    break;
                case 2:
                    this.ui.renderPainPointsLevel();
                    break;
                case 3:
                    this.ui.renderSolutionsLevel();
                    break;
                case 4:
                    this.ui.renderResults();
                    break;
            }
        }

        // Update navigation
        this.updateNavigation();
        this.updateCompasProgress();
    }

    /**
     * Validate if user can proceed from current level
     */
    validateCurrentLevel() {
        console.log('validateCurrentLevel() called for level:', this.state.currentLevel);
        
        switch (this.state.currentLevel) {
            case 1:
                console.log('Validating level 1 - selectedWorkflow:', this.state.selectedWorkflow);
                if (!this.state.selectedWorkflow) {
                    console.log('Level 1 validation failed: no workflow selected');
                    this.showNotification('Please select a workflow to continue', 'error');
                    return false;
                }
                if (this.state.selectedWorkflow === 'custom' && !this.state.customWorkflow) {
                    const input = document.getElementById('customWorkflowInput');
                    if (!input || !input.value.trim()) {
                        console.log('Level 1 validation failed: custom workflow not described');
                        this.showNotification('Please describe your custom workflow', 'error');
                        return false;
                    }
                }
                console.log('Level 1 validation passed');
                break;
            case 2:
                console.log('Validating level 2 - painPoints:', this.state.painPoints.length, 'currentPainPointIndex:', this.state.currentPainPointIndex);
                if (this.state.painPoints.length === 0) {
                    console.log('Level 2 validation failed: no pain points');
                    this.showNotification('Please add at least one pain point', 'error');
                    return false;
                }
                if (this.state.currentPainPointIndex === -1) {
                    console.log('Level 2 validation failed: no pain point selected');
                    this.showNotification('Please select a pain point to focus on', 'error');
                    return false;
                }
                console.log('Level 2 validation passed');
                break;
            case 3:
                const hasSolutions = Object.values(this.state.solutions).some(arr => arr.length > 0);
                console.log('Validating level 3 - hasSolutions:', hasSolutions);
                if (!hasSolutions) {
                    console.log('Level 3 validation failed: no solutions');
                    this.showNotification('Please add at least one solution', 'error');
                    return false;
                }
                console.log('Level 3 validation passed');
                break;
        }
        console.log('Validation completed successfully');
        return true;
    }

    /**
     * Check if user can proceed to next level
     */
    canProceed() {
        return this.validateCurrentLevel();
    }

    /**
     * Update navigation buttons
     */
    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const navigation = document.getElementById('navigation');

        if (!navigation) return;

        // Show/hide navigation based on level
        if (this.state.currentLevel === 0 || this.state.currentLevel === 4) {
            navigation.style.display = 'none';
        } else {
            navigation.style.display = 'flex';
        }

        // Update previous button
        if (prevBtn) {
            prevBtn.disabled = this.state.currentLevel === 0;
        }

        // Update next button
        if (nextBtn) {
            const canProceed = this.canProceed();
            nextBtn.disabled = !canProceed;
            
            // Update button text based on level
            if (this.state.currentLevel === 3) {
                nextBtn.innerHTML = '🎉 See Your Results! ➡️';
            } else {
                nextBtn.innerHTML = 'Next Step ➡️';
            }
        }
        
        // Re-bind navigation events to ensure they work after DOM updates
        if (this.ui && this.ui.bindNavigationButtons) {
            this.ui.bindNavigationButtons();
        }
    }

    /**
     * Update COMPAS framework progress indicators
     */
    updateCompasProgress() {
        const steps = ['context', 'objective', 'method'];
        
        steps.forEach((step, index) => {
            const element = document.getElementById(`compas-${step}`);
            if (!element) return;
            
            element.classList.remove('active', 'completed');
            
            if (this.state.currentLevel > index) {
                element.classList.add('completed');
            } else if (this.state.currentLevel === index + 1) {
                element.classList.add('active');
            }
        });
    }

    /**
     * Update overall progress bar
     */
    updateProgress() {
        const progress = (this.state.currentLevel / 4) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            const messages = [
                "Ready to begin your detective journey!",
                "🧭 Context identified - great start!",
                "🔍 Pain points discovered - you're on the trail!",
                "🎯 Solutions designed - almost there!",
                "🎉 Mission complete - you did it!"
            ];
            progressText.textContent = messages[this.state.currentLevel] || '';
        }
    }

    /**
     * Export public API
     */
    getAPI() {
        return {
            init: this.init.bind(this),
            reset: this.reset.bind(this),
            getState: () => ({ ...this.state }),
            setWorkflow: this.selectWorkflow.bind(this),
            addPainPoint: this.addPainPoint.bind(this),
            addSolution: this.addSolution.bind(this),
            exportPlan: this.exportPlan.bind(this)
        };
    }

    /**
     * Reset the application
     */
    reset() {
        this.state = {
            currentLevel: 0,
            selectedWorkflow: '',
            customWorkflow: '',
            painPoints: [],
            currentPainPointIndex: -1,
            solutions: {},
            existingTools: {},
            neededTools: {},
            totalPoints: 0,
            earnedBadges: []
        };
        
        this.showLevel(0);
        this.render();
    }

    /**
     * Main render method
     */
    render() {
        // This will be implemented in the UI module
        if (this.ui) {
            this.ui.render();
        }
    }
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIWorkflowDetective;
} else {
    window.AIWorkflowDetective = AIWorkflowDetective;
}