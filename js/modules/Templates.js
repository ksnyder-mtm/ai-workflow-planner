/**
 * Templates Module for AI Workflow Detective
 * Contains all HTML templates for the application
 */

class WorkflowTemplates {
    constructor() {
        this.compasSteps = [
            { id: 'context', name: 'Context', description: 'Choose workflow' },
            { id: 'objective', name: 'Objective', description: 'Identify pain & solutions' },
            { id: 'method', name: 'Method', description: 'Plan implementation' }
        ];
    }

    /**
     * Get main application layout
     */
    getMainLayout() {
        return `
            <div class="container">
                ${this.getGamificationBar()}
                ${this.getProgressSection()}
                <div class="game-area">
                    ${this.getLevelContainers()}
                    ${this.getNavigation()}
                </div>
            </div>
        `;
    }

    /**
     * Get COMPAS framework indicator
     * Note: Removed from UI to reduce clutter and avoid blocking content
     */
    getCompasIndicator() {
        return '';
    }

    /**
     * Get gamification bar
     */
    getGamificationBar() {
        return `
            <div class="gamification-bar">
                <div class="explorer-title">
                    <span class="explorer-icon">AI</span>
                    <span>AI Workflow Explorer</span>
                </div>
                <!-- Points system removed to focus on workflow process -->
                <div class="badges-container">
                    <div class="badge" id="badge-detective" title="AI Explorer">🤖</div>
                    <div class="badge" id="badge-investigator" title="Workflow Explorer">🔍</div>
                </div>
            </div>
        `;
    }

    /**
     * Get progress section
     */
    getProgressSection() {
        return `
            <div class="progress-section">
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="progress-text" id="progressText">🗺️ Ready to Begin Your AI Explorer Journey!</div>
            </div>
        `;
    }

    /**
     * Get all level containers
     */
    getLevelContainers() {
        return `
            <div class="level active" id="overview"></div>
            <div class="level" id="level1"></div>
            <div class="level" id="level2"></div>
            <div class="level" id="level3"></div>
            <div class="level" id="results"></div>
        `;
    }

    /**
     * Get navigation section
     */
    getNavigation() {
        return `
            <div class="navigation" id="navigation">
                <button class="nav-btn" id="prevBtn">
                    Previous
                </button>
                <button class="nav-btn" id="nextBtn">
                    Next Step
                </button>
            </div>
        `;
    }

    /**
     * Get overview content
     */
    getOverviewContent() {
        return `
            <div class="level-header">
                <div class="level-title">
                    Your AI Enhancement Journey
                </div>
                <div class="level-description">
                    Welcome, AI Detective! You're about to discover how AI can make your nonprofit work more impactful - not by replacing what you do, but by handling the tedious stuff so you can focus on what matters most.
                </div>
                <button class="help-button" onclick="showHelp('overview')">?</button>
            </div>

            <div class="mobile-compas">
                <h4>You'll explore the COMPAS framework:</h4>
                <div class="compas-badges">
                    <span class="compas-badge context">Context</span>
                    <span class="compas-badge objective">Objective</span>
                </div>
            </div>

            <div class="overview-cards">
                <div class="overview-card play">
                    <h3>How to Play</h3>
                    <p>Earn points and badges as you identify workflows, discover pain points, and design AI solutions. Each choice you make builds your personalized AI enhancement plan!</p>
                </div>
                
                <div class="overview-card time">
                    <h3>Time Investment</h3>
                    <p>About 10-15 minutes to complete. You'll walk away with a concrete plan you can actually use - no fluff, just practical next steps.</p>
                </div>
                
                <div class="overview-card remember">
                    <h3>Remember This</h3>
                    <p>AI augmentation = AI does the boring stuff, you do the brilliant stuff. It's about partnership, not replacement!</p>
                </div>
            </div>

            <div class="mission-box">
                <h3>Your Mission</h3>
                <div class="mission-steps">
                    <div class="mission-step">
                        <div class="step-number">1</div>
                        <h4>Context</h4>
                        <p>Choose a workflow that needs help</p>
                                            </div>
                    <div class="mission-step">
                        <div class="step-number">2</div>
                        <h4>Find Opportunities</h4>
                        <p>Identify what's slowing you down</p>
                                            </div>
                    <div class="mission-step">
                        <div class="step-number">3</div>
                        <h4>Objective</h4>
                        <p>Design AI-powered solutions</p>
                                            </div>
                </div>
            </div>

            <div class="hint-box">
                <h4>Pro Tip</h4>
                <p>Think of a task you did this week that made you think "there has to be a better way!" That's your perfect starting point.</p>
            </div>

            <div class="start-section">
                <button class="nav-btn start-detective-btn">
                    Start Your AI Workflow Journey
                </button>
            </div>
        `;
    }

    /**
     * Get workflow level content
     */
    getWorkflowLevel(workflows) {
        return `
            <div class="level-header">
                <div class="level-title">
                    Mission 1: Context - Choose Your Workflow Challenge
                </div>
                <div class="level-description">
                    Every nonprofit has workflows that eat up precious time. Which one frustrates you the most? Select one below or create your own.
                </div>
                <button class="help-button" onclick="showHelp('workflow')">?</button>
            </div>

            <div class="hint-box" id="inspirationBox">
                <h4>Need inspiration? Click any example below:</h4>
                <div class="examples" id="workflowExamples">
                    <div class="example-item" data-example="meetings">• "Our weekly team meetings feel like Groundhog Day"</div>
                    <div class="example-item" data-example="communication">• "I write the same donor thank-you email 50 times a month"</div>
                    <div class="example-item" data-example="data">• "Survey responses sit in a spreadsheet graveyard"</div>
                </div>
            </div>

            <div class="workflow-cards" id="workflowCards">
                ${workflows.map(workflow => `
                    <div class="workflow-card" data-workflow="${workflow.id}">
                                                <h3>${workflow.icon} ${workflow.title}</h3>
                        <p>${workflow.description}</p>
                    </div>
                `).join('')}
            </div>

            <div id="customWorkflowSection" style="display: none;">
                <div class="hint-box">
                    <h4>Describe Your Custom Workflow:</h4>
                    <input type="text" id="customWorkflowInput" 
                           placeholder="e.g., Client intake process, Volunteer training, Program delivery..." 
                           class="custom-workflow-input">
                    <p class="input-hint">Bonus points for being specific! 🎯</p>
                </div>
            </div>
        `;
    }

    /**
     * Get pain points level content
     */
    getPainPointsLevel(workflowTitle, examples) {
        return `
            <div class="level-header">
                <div class="level-title">
                    Mission 2: Explorer Work - Find the Pain Points
                </div>
                <div class="level-description">
                    <span id="workflowContext">Great work selecting ${workflowTitle}!</span> 
                    Now let's dig deeper. What specifically makes this workflow a time thief? 
                    List all your pain points, then select the one you want to tackle first.
                </div>
                <button class="help-button" onclick="showHelp('pain')">?</button>
            </div>

            <div class="hint-box">
                <h4>Explorer Clues to Look For:</h4>
                <p>Tasks that are: repetitive • time-consuming • error-prone • involve manual copying • require waiting • feel unnecessarily complex</p>
                ${examples.length > 0 ? `
                    <div class="examples" id="painExamples">
                        <div style="margin-top: 10px;">Examples for ${workflowTitle}:</div>
                        ${examples.slice(0, 3).map(ex => `<div class="example-item">• ${ex}</div>`).join('')}
                    </div>
                ` : ''}
            </div>

            <div class="pain-points-section">
                <h3>What specific tasks waste your time?</h3>
                <div class="pain-point-input">
                    <input type="text" id="painPointInput" 
                           placeholder="Describe a specific pain point or time waster...">
                    <button class="add-pain-btn">Add</button>
                </div>
                <div class="points-info">
                    Add all the pain points you can think of, then select one to focus on
                </div>
                <div class="pain-point-list" id="painPointList"></div>
                
                <div id="selectedPainPointSection" class="selected-pain-section">
                    <h4>Selected Pain Point to Solve:</h4>
                    <p id="selectedPainPointText"></p>
                    <button class="nav-btn change-selection-btn">
                        Change Selection
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Get pain point list item
     */
    getPainPointItem(point, index, isSelected) {
        return `
            <div class="pain-point-item ${isSelected ? 'selected' : ''}" id="pain-${index}">
                <span>${point.text}</span>
                <div class="pain-point-actions">
                    <button class="nav-btn select-pain-btn" 
                            data-action="select-pain" data-index="${index}">
                        ${isSelected ? 'Selected' : 'Select'}
                    </button>
                    <button class="remove-btn" data-action="remove-pain" data-index="${index}">×</button>
                </div>
            </div>
        `;
    }

    /**
     * Get solutions level content
     */
    getSolutionsLevel(focusedPain, aiCapabilities) {
        return `
            <div class="level-header">
                <div class="level-title">
                    Mission 3: Objective - Design Your AI Solutions
                </div>
                <div class="level-description">
                    Time to transform pain into progress! Focus on solving your selected pain point with AI assistance. 
                    Remember: AI handles the repetitive stuff, you handle the human stuff.
                </div>
                <button class="help-button" onclick="showHelp('solution')">?</button>
            </div>

            <div class="focused-pain-point">
                <h3>Solving This Pain Point:</h3>
                <p id="focusedPainText">${focusedPain.text}</p>
                <p class="subtitle">Now let's brainstorm AI solutions to tackle this specific challenge!</p>
            </div>

            <div class="hint-box">
                <h4>AI Capabilities at Your Disposal:</h4>
                <div class="ai-capabilities">
                    ${aiCapabilities.map(cap => `
                        <div class="ai-capability" draggable="true" data-capability="${cap.id}">
                            <h4>${cap.icon} ${cap.name}</h4>
                            <p>${cap.description}</p>
                        </div>
                    `).join('')}
                </div>
                <p class="drag-hint">Drag AI capabilities above or type your own solutions below!</p>
            </div>

            <div id="solutionsContainer"></div>
            
            <div class="additional-pain-points">
                <h4>Want to solve another pain point?</h4>
                <div id="remainingPainPoints"></div>
                <p class="bonus-hint">Each additional pain point solution earns bonus points!</p>
            </div>
        `;
    }

    /**
     * Get solution builder for a pain point
     */
    getSolutionBuilder(painPointIndex) {
        return `
            <div class="solution-container" id="solutionContainer${painPointIndex}">
                <div class="solution-builder" id="solutionBuilder${painPointIndex}">
                    <div class="solutions-list" id="solutionsList${painPointIndex}"></div>
                </div>
                <div class="custom-solution-input">
                    <textarea id="solution${painPointIndex}" 
                              placeholder="Describe how AI could help solve this specific pain point..."
                              class="solution-textarea"></textarea>
                    <button class="add-pain-btn add-solution-btn">
                        Add Solution
                    </button>
                </div>
                
                <div id="toolsSection${painPointIndex}" class="tools-section">
                    <h4>Tools & Resources</h4>
                    <p class="tools-hint">Focus on using what you already have first!</p>
                    
                    <div class="tools-input-group">
                        <label>Tools you can use right now:</label>
                        <textarea id="existingTools${painPointIndex}" 
                                  placeholder="What do you already have that could help? (Microsoft Office, Google Workspace, Slack, Teams, email, existing databases, spreadsheets, your team's knowledge...)"
                                  class="tools-textarea"></textarea>
                    </div>
                    
                    <div class="tools-input-group">
                        <label>Additional tools (only if needed):</label>
                        <textarea id="neededTools${painPointIndex}" 
                                  placeholder="Only list if absolutely necessary... (e.g., specific AI tools, training, subscriptions). Remember: start with what you have!"
                                  class="tools-textarea needed"></textarea>
                    </div>
                    
                    <button class="add-pain-btn save-tools-btn">
                        Save Your Resource Plan
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Get solution item
     */
    getSolutionItem(solution, painPointIndex, solutionIndex, solutionType = 'unknown') {
        const typeIcon = solutionType === 'ai-suggested' ? '🤖' : 
                        solutionType === 'user-written' ? '✍️' : '•';
        const typeClass = solutionType === 'ai-suggested' ? 'ai-suggested' : 
                         solutionType === 'user-written' ? 'user-written' : '';
        
        return `
            <div class="solution-item ${typeClass}">
                <span class="solution-type-icon" title="${solutionType === 'ai-suggested' ? 'AI-suggested solution' : 'Your custom solution'}">${typeIcon}</span>
                <span class="solution-text">${solution}</span>
                <button class="remove-btn" 
                        data-action="remove-solution" data-pain-index="${painPointIndex}" data-solution-index="${solutionIndex}">×</button>
            </div>
        `;
    }

    /**
     * Get remaining pain point item
     */
    getRemainingPainPointItem(point, originalIndex, hasSolutions) {
        return `
            <div class="remaining-pain-item ${hasSolutions ? 'has-solutions' : ''}">
                <span>${point.text} ${hasSolutions ? '(completed)' : ''}</span>
                <button class="nav-btn switch-pain-btn" 
                        data-action="switch-pain" data-index="${originalIndex}">
                    ${hasSolutions ? 'Edit Solutions' : 'Add Solutions'}
                </button>
            </div>
        `;
    }

    /**
     * Get results level content
     */
    getResultsLevel(totalPoints, scoreMessage, workflowSummary, earnedBadges) {
        return `
            <div class="celebration">
                <h2>Mission Complete!</h2>
                <p>You've successfully mapped your AI enhancement journey!</p>
                <div class="completion-trophy">
                    <div class="final-trophy">🏆</div>
                    <p>Congratulations on completing your workflow analysis!</p>
                </div>
            </div>

            
            <div class="results-section">
                <h3>Your AI-Augmented Workflow Plan</h3>
                <div id="workflowSummary">
                    ${this.buildWorkflowSummaryHTML(workflowSummary)}
                </div>
                
                <div class="next-steps-box">
                    <h4>Next Steps:</h4>
                    <ol>
                        <li>Pick your highest-severity pain point to tackle first</li>
                        <li>Try one AI solution for a week and measure the time saved</li>
                        <li>Share your plan with your team for feedback</li>
                        <li>Celebrate small wins - every minute saved is a victory!</li>
                    </ol>
                </div>
                
                <div class="action-buttons">
                    <button class="download-btn">
                        Download Your Plan as PDF
                    </button>
                    <p class="download-hint">
                        This opens a print-friendly window where you can save as PDF using your browser
                    </p>
                    <button class="reset-btn">Start Over</button>
                </div>
            </div>
        `;
    }

    /**
     * Build workflow summary HTML
     */
    buildWorkflowSummaryHTML(summary) {
        return `
            <div class="workflow-summary">
                <h4>Workflow: ${summary.workflow}</h4>
                ${summary.painPoints.map((pain, index) => `
                    <div class="pain-summary">
                        <h5>Pain Point ${index + 1}: ${pain.text}</h5>
                        ${pain.solutions.length > 0 ? `
                            <div class="solutions-summary">
                                <strong>Solutions:</strong>
                                <ul>
                                    ${pain.solutions.map(sol => {
                                        // Handle both string and object formats
                                        const text = typeof sol === 'string' ? sol : sol.text;
                                        const type = typeof sol === 'object' ? sol.type : 'unknown';
                                        const icon = type === 'ai-suggested' ? '🤖' : 
                                                    type === 'user-written' ? '✍️' : '•';
                                        return `<li><span class="solution-icon">${icon}</span> ${text}</li>`;
                                    }).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${pain.existingTools || pain.neededTools ? `
                            <div class="tools-summary">
                                ${pain.existingTools ? `<p><strong>Existing Tools:</strong> ${pain.existingTools}</p>` : ''}
                                ${pain.neededTools ? `<p><strong>Additional Tools Needed:</strong> ${pain.neededTools}</p>` : ''}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Get badge icon by ID
     */
    getBadgeIcon(badgeId) {
        const badgeMap = {
            'badge-workflow': 'W',
            'badge-pain': 'P',
            'badge-solution': 'S',
            'badge-complete': 'M'
        };
        return badgeMap[badgeId] || 'B';
    }
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkflowTemplates;
} else {
    window.WorkflowTemplates = WorkflowTemplates;
}