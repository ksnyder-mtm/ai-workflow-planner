/**
 * Workflow Methods Module for AI Workflow Detective
 * Contains all workflow-specific business logic
 */

class WorkflowMethods {
    /**
     * Start the detective work (from overview)
     */
    static startDetectiveWork(app) {
        app.state.currentLevel = 1;
        app.showLevel(1);
        app.updateProgress();
        app.updatePoints(5, 'Journey started!');
        
        // Render workflow level
        if (app.ui) {
            app.ui.renderWorkflowLevel();
        }
    }

    /**
     * Select a workflow
     */
    static selectWorkflow(app, workflow, element) {
        // Remove previous selection
        document.querySelectorAll('.workflow-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        if (element) {
            element.classList.add('selected');
        }

        // Update state
        app.state.selectedWorkflow = workflow;

        // Show custom workflow input if needed
        const customSection = document.getElementById('customWorkflowSection');
        if (customSection) {
            customSection.style.display = workflow === 'custom' ? 'block' : 'none';
        }

        // Award points
        const points = workflow === 'custom' ? 
            app.config.points.customWorkflow : 
            app.config.points.workflowSelect;
        
        app.updatePoints(points, 'Workflow selected!');
        
        // Award badge
        if (!app.state.earnedBadges.includes('badge-workflow')) {
            app.earnBadge('badge-workflow');
        }

        // Update navigation
        app.updateNavigation();
    }

    /**
     * Add a pain point
     */
    static addPainPoint(app) {
        const input = document.getElementById('painPointInput');
        if (!input) return;

        const painPoint = input.value.trim();
        if (painPoint) {
            app.state.painPoints.push({
                text: painPoint,
                severity: 'medium' // Could be expanded to allow user selection
            });

            input.value = '';
            app.updatePoints(app.config.points.painPointAdd, 'Pain point identified!');

            // Update display
            if (app.ui) {
                app.ui.updatePainPointsList();
            }

            // Award badge after 3 pain points
            if (app.state.painPoints.length === 3 && !app.state.earnedBadges.includes('badge-pain')) {
                app.earnBadge('badge-pain');
            }

            app.updateNavigation();
        } else {
            app.showNotification('Please describe a pain point', 'error');
        }
    }

    /**
     * Select a pain point to focus on
     */
    static selectPainPoint(app, index) {
        app.state.currentPainPointIndex = index;
        
        if (app.ui) {
            app.ui.updatePainPointsList();
        }
        
        app.updateNavigation();
        app.updatePoints(app.config.points.painPointSelect, 'Pain point selected for focus!');
        app.showNotification(`🎯 Focusing on: "${app.state.painPoints[index].text}"`, 'success');
    }

    /**
     * Remove a pain point
     */
    static removePainPoint(app, index) {
        const item = document.getElementById(`pain-${index}`);
        if (item) {
            item.classList.add('removing');
        }

        setTimeout(() => {
            app.state.painPoints.splice(index, 1);
            
            // Adjust currentPainPointIndex if needed
            if (app.state.currentPainPointIndex === index) {
                app.state.currentPainPointIndex = -1;
                const selectedSection = document.getElementById('selectedPainPointSection');
                if (selectedSection) {
                    selectedSection.style.display = 'none';
                }
            } else if (app.state.currentPainPointIndex > index) {
                app.state.currentPainPointIndex--;
            }
            
            if (app.ui) {
                app.ui.updatePainPointsList();
            }
            
            app.updateNavigation();
        }, 300);
    }

    /**
     * Add a solution
     */
    static addSolution(app, painPointIndex, solutionText = null) {
        let solution = solutionText;
        
        // If no solution text provided, get from textarea
        if (!solution) {
            const textarea = document.getElementById(`solution${painPointIndex}`);
            if (!textarea) return;
            solution = textarea.value.trim();
        }
        
        if (solution) {
            if (!app.state.solutions[painPointIndex]) {
                app.state.solutions[painPointIndex] = [];
            }
            
            // Store as object with type 'user-written'
            app.state.solutions[painPointIndex].push({
                text: solution,
                type: 'user-written',
                timestamp: Date.now()
            });
            
            // Clear textarea if it exists
            const textarea = document.getElementById(`solution${painPointIndex}`);
            if (textarea) {
                textarea.value = '';
            }
            
            if (app.ui) {
                app.ui.updateSolutionsList(painPointIndex);
                app.ui.updateRemainingPainPoints();
            }
            
            app.updateNavigation();
            app.updatePoints(app.config.points.solutionAdd, 'Solution added!');
            
            // Show tools section after adding a solution
            const toolsSection = document.getElementById(`toolsSection${painPointIndex}`);
            if (toolsSection) {
                toolsSection.style.display = 'block';
            }
            
            // Check for solution badge
            const totalSolutions = Object.values(app.state.solutions).flat().length;
            if (totalSolutions === 3 && !app.state.earnedBadges.includes('badge-solution')) {
                app.earnBadge('badge-solution');
            }
        } else {
            app.showNotification('Please describe a solution', 'error');
        }
    }

    /**
     * Remove a solution
     */
    static removeSolution(app, painPointIndex, solutionIndex) {
        app.state.solutions[painPointIndex].splice(solutionIndex, 1);
        
        if (app.ui) {
            app.ui.updateSolutionsList(painPointIndex);
            app.ui.updateRemainingPainPoints();
        }
        
        app.updateNavigation();
    }

    /**
     * Save tools for a pain point
     */
    static saveTools(app, painPointIndex) {
        const existingToolsInput = document.getElementById(`existingTools${painPointIndex}`);
        const neededToolsInput = document.getElementById(`neededTools${painPointIndex}`);
        
        if (!existingToolsInput || !neededToolsInput) return;

        const existingToolsText = existingToolsInput.value.trim();
        const neededToolsText = neededToolsInput.value.trim();
        
        if (existingToolsText || neededToolsText) {
            app.state.existingTools[painPointIndex] = existingToolsText;
            app.state.neededTools[painPointIndex] = neededToolsText;
            
            app.updatePoints(app.config.points.toolsSave, 'Tools identified!');
            app.showNotification('🛠️ Tools saved! This will help you plan implementation.', 'success');
            
            // Update button to show it's saved
            const button = document.querySelector(`#toolsSection${painPointIndex} .save-tools-btn`);
            if (button) {
                button.innerHTML = '✅ Tools Saved';
                button.style.background = '#28a745';
                button.disabled = true;
            }
        } else {
            app.showNotification('Please identify at least one tool', 'error');
        }
    }

    /**
     * Switch to a different pain point
     */
    static switchToPainPoint(app, index) {
        app.state.currentPainPointIndex = index;
        
        if (app.ui) {
            app.ui.renderSolutionsLevel();
        }
        
        app.showNotification(`🎯 Now focusing on: "${app.state.painPoints[index].text}"`, 'success');
    }

    /**
     * Setup solutions level
     */
    static setupSolutionsLevel(app) {
        if (app.ui) {
            app.ui.renderSolutionsLevel();
        }
    }

    /**
     * Setup results screen
     */
    static setupResults(app) {
        // Award completion badge
        if (!app.state.earnedBadges.includes('badge-complete')) {
            app.earnBadge('badge-complete');
        }

        // Calculate bonus points
        const completionBonus = 50;
        app.updatePoints(completionBonus, 'Mission complete!');

        if (app.ui) {
            app.ui.renderResults();
        }
    }

    /**
     * Export the workflow plan
     */
    static exportPlan(app) {
        // Create print-friendly version
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            app.showNotification('Please allow popups to download your plan', 'error');
            return;
        }

        const { selectedWorkflow, customWorkflow, painPoints, solutions, existingTools, neededTools } = app.state;
        const workflowTitle = selectedWorkflow === 'custom' ? customWorkflow : app.workflowData[selectedWorkflow]?.title;

        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>AI Workflow Enhancement Plan - ${workflowTitle}</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 800px; 
                        margin: 0 auto; 
                        padding: 20px;
                        line-height: 1.6;
                    }
                    h1, h2, h3 { color: #1c487b; }
                    .header { 
                        text-align: center; 
                        margin-bottom: 30px; 
                        padding-bottom: 20px; 
                        border-bottom: 2px solid #1c487b;
                    }
                    .pain-point { 
                        margin-bottom: 30px; 
                        padding: 20px; 
                        background: #f8f9fa; 
                        border-radius: 8px;
                        page-break-inside: avoid;
                    }
                    .solutions { 
                        margin-left: 20px; 
                        margin-top: 10px;
                    }
                    .ai-solutions {
                        background: #e3f2fd;
                        padding: 10px;
                        border-left: 3px solid #2196f3;
                        border-radius: 5px;
                    }
                    .user-solutions {
                        background: #f3e5f5;
                        padding: 10px;
                        border-left: 3px solid #9c27b0;
                        border-radius: 5px;
                    }
                    .solutions li {
                        margin: 5px 0;
                    }
                    h4 {
                        margin-bottom: 10px;
                        margin-top: 15px;
                    }
                    .tools { 
                        margin-top: 15px; 
                        padding: 10px; 
                        background: #e8f6f8; 
                        border-radius: 5px;
                    }
                    .next-steps { 
                        margin-top: 30px; 
                        padding: 20px; 
                        background: #fef4e3; 
                        border-radius: 8px;
                    }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>AI Workflow Enhancement Plan</h1>
                    <h2>${workflowTitle}</h2>
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>

                <h2>Identified Pain Points & Solutions</h2>
                ${painPoints.map((pain, index) => {
                    const painSolutions = solutions[index] || [];
                    const aiSolutions = painSolutions.filter(sol => 
                        (typeof sol === 'object' && sol.type === 'ai-suggested') || 
                        (typeof sol === 'string' && sol.includes(':'))
                    );
                    const userSolutions = painSolutions.filter(sol => 
                        (typeof sol === 'object' && sol.type === 'user-written') || 
                        (typeof sol === 'string' && !sol.includes(':'))
                    );
                    
                    return `
                    <div class="pain-point">
                        <h3>Pain Point ${index + 1}: ${pain.text}</h3>
                        ${painSolutions.length > 0 ? `
                            ${aiSolutions.length > 0 ? `
                                <h4>🤖 AI-Suggested Solutions:</h4>
                                <ul class="solutions ai-solutions">
                                    ${aiSolutions.map(sol => {
                                        const text = typeof sol === 'string' ? sol : sol.text;
                                        return `<li>${text}</li>`;
                                    }).join('')}
                                </ul>
                            ` : ''}
                            ${userSolutions.length > 0 ? `
                                <h4>✍️ Your Custom Solutions:</h4>
                                <ul class="solutions user-solutions">
                                    ${userSolutions.map(sol => {
                                        const text = typeof sol === 'string' ? sol : sol.text;
                                        return `<li>${text}</li>`;
                                    }).join('')}
                                </ul>
                            ` : ''}
                        ` : '<p><em>No solutions defined yet</em></p>'}
                        ${(existingTools[index] || neededTools[index]) ? `
                            <div class="tools">
                                ${existingTools[index] ? `<p><strong>Existing Tools:</strong> ${existingTools[index]}</p>` : ''}
                                ${neededTools[index] ? `<p><strong>Additional Tools Needed:</strong> ${neededTools[index]}</p>` : ''}
                            </div>
                        ` : ''}
                    </div>
                `}).join('')}

                <div class="next-steps">
                    <h2>Recommended Next Steps</h2>
                    <ol>
                        <li>Review this plan with your team to gather feedback and buy-in</li>
                        <li>Choose one pain point to tackle first (recommend starting with quick wins)</li>
                        <li>Set up the necessary tools and provide basic training to team members</li>
                        <li>Implement the AI solution for 2-4 weeks as a pilot</li>
                        <li>Measure time saved and gather team feedback</li>
                        <li>Refine the approach based on results</li>
                        <li>Roll out to additional pain points once the first is successful</li>
                    </ol>
                    <p><strong>Remember:</strong> AI augmentation is about making your work easier, not replacing human judgment and creativity!</p>
                </div>

                <div class="no-print" style="text-align: center; margin-top: 30px;">
                    <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px;">
                        Print or Save as PDF
                    </button>
                </div>
            </body>
            </html>
        `;

        printWindow.document.write(printContent);
        printWindow.document.close();
    }
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkflowMethods;
} else {
    window.WorkflowMethods = WorkflowMethods;
}