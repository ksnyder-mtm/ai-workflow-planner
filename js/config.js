/**
 * Configuration file for AI Workflow Detective
 * Customize the application behavior, content, and settings here
 */

const AppConfig = {
    // Application metadata
    app: {
        name: 'AI Workflow Detective',
        subtitle: 'COMPAS Edition',
        version: '2.0.0',
        description: 'A gamified tool for nonprofits to identify AI enhancement opportunities'
    },

    // Points system configuration
    points: {
        workflowSelect: 10,
        customWorkflow: 15,
        painPointAdd: 5,
        painPointSelect: 10,
        solutionAdd: 10,
        toolsSave: 5,
        badgeEarn: 20,
        completionBonus: 50
    },

    // Badge configuration
    badges: {
        workflow: {
            id: 'badge-workflow',
            icon: '🗺️',
            title: 'Workflow Explorer',
            description: 'Selected a workflow to analyze'
        },
        pain: {
            id: 'badge-pain',
            icon: '🔍',
            title: 'Pain Point Detective',
            description: 'Identified 3+ pain points'
        },
        solution: {
            id: 'badge-solution',
            icon: '💡',
            title: 'Solution Designer',
            description: 'Created 3+ AI solutions'
        },
        complete: {
            id: 'badge-complete',
            icon: '🏆',
            title: 'Master Detective',
            description: 'Completed the full workflow analysis'
        }
    },

    // Animation and timing settings
    animations: {
        duration: 300,
        notificationDuration: 3000,
        progressTransition: 500,
        cardHoverDelay: 100
    },

    // UI customization
    ui: {
        containerSelector: '#app',
        maxPainPoints: 10,
        maxSolutionsPerPain: 5,
        enableKeyboardNavigation: true,
        enableDragDrop: true,
        enableTooltips: true
    },

    // Content customization
    content: {
        // Welcome message variations
        welcomeMessages: [
            "Ready to begin your detective journey!",
            "Let's discover AI opportunities together!",
            "Time to solve workflow mysteries!"
        ],
        
        // Progress messages by level
        progressMessages: {
            0: "Ready to begin your detective journey!",
            1: "🧭 Context identified - great start!",
            2: "🔍 Pain points discovered - you're on the trail!",
            3: "🎯 Solutions designed - almost there!",
            4: "🎉 Mission complete - you did it!"
        },

        // Score messages based on final points
        scoreMessages: {
            200: "🌟 AI Detective Master! You've uncovered game-changing opportunities!",
            150: "🎯 Expert Detective! Your workflow transformation plan is solid!",
            100: "💪 Great Detective Work! You've identified key improvements!",
            50: "👍 Good Start! You've begun your AI enhancement journey!",
            0: "✨ Journey Started! Every step counts towards improvement!"
        }
    },

    // Help content for each section
    help: {
        overview: "This tool helps you identify workflows that could benefit from AI enhancement. You'll earn points and badges as you complete each step!",
        workflow: "Choose the type of work that takes up too much of your time. Be specific - the more detailed you are, the better solutions we can suggest.",
        pain: "Think about specific tasks that are repetitive, time-consuming, or error-prone. These are perfect candidates for AI assistance.",
        solution: "Match AI capabilities to your pain points. You can drag and drop suggested capabilities or write your own custom solutions."
    },

    // Workflow definitions - can be easily customized for different organizations
    workflows: {
        meetings: {
            title: "Meeting Management",
            icon: "📋",
            description: "Planning, running, and following up on meetings",
            category: "Collaboration",
            examples: [
                "Taking notes while facilitating",
                "Remembering to follow up on action items",
                "Scheduling with multiple people",
                "Writing meeting agendas from scratch",
                "Tracking decisions across meetings"
            ],
            aiSuggestions: [
                "AI meeting transcription and summarization",
                "Automated action item extraction and tracking",
                "Smart scheduling assistants with availability checking",
                "Dynamic meeting agenda generation",
                "Decision tracking and searchable meeting database"
            ]
        },
        communication: {
            title: "Communication & Outreach",
            icon: "📧",
            description: "Emails, newsletters, social media, donor communications",
            category: "Outreach",
            examples: [
                "Writing similar emails repeatedly",
                "Personalizing mass communications",
                "Managing social media content",
                "Translating materials for diverse audiences",
                "Responding to common questions"
            ],
            aiSuggestions: [
                "Email template generation with personalization",
                "Automated mail merge with smart customization",
                "Social media content calendar and scheduling",
                "Multi-language translation and localization",
                "FAQ chatbot for common inquiries"
            ]
        },
        data: {
            title: "Data Collection & Analysis",
            icon: "📊",
            description: "Surveys, reports, program evaluation, grant reporting",
            category: "Analytics",
            examples: [
                "Manually organizing survey responses",
                "Creating charts and visualizations from spreadsheets",
                "Writing summary reports from raw data",
                "Finding patterns in feedback and evaluations",
                "Cleaning and standardizing messy data"
            ],
            aiSuggestions: [
                "Survey response categorization and summarization",
                "Automated chart and visualization generation",
                "Report draft creation from data analysis",
                "Pattern recognition in qualitative feedback",
                "Data cleaning and standardization tools"
            ]
        },
        admin: {
            title: "Administrative Tasks",
            icon: "📁",
            description: "Scheduling, file organization, volunteer coordination",
            category: "Operations",
            examples: [
                "Coordinating volunteer schedules and assignments",
                "Organizing digital files and documents",
                "Tracking program attendance and participation",
                "Managing contact databases and information",
                "Creating routine documents and forms"
            ],
            aiSuggestions: [
                "Volunteer scheduling system with preference matching",
                "Smart file organization and tagging",
                "Automated attendance tracking and reporting",
                "CRM integration and contact management",
                "Document template generation and form creation"
            ]
        },
        fundraising: {
            title: "Fundraising & Grants",
            icon: "💝",
            description: "Grant writing, donor research, event planning",
            category: "Development",
            examples: [
                "Researching potential donors and foundations",
                "Tracking grant deadlines and requirements",
                "Writing personalized thank you letters",
                "Creating fundraising reports and impact stories",
                "Finding and matching relevant grant opportunities"
            ],
            aiSuggestions: [
                "Donor research and prospect identification tools",
                "Grant calendar automation and deadline tracking",
                "Personalized thank you letter generation",
                "Impact report builder with story creation",
                "Grant matching service with requirement analysis"
            ]
        }
    },

    // AI capabilities that can be customized for different use cases
    aiCapabilities: [
        {
            id: 'summarize',
            name: 'Summarizing',
            icon: '📝',
            description: 'Condense long documents, meeting notes, or emails into key points',
            category: 'Content Processing',
            useCase: 'Perfect for handling information overload'
        },
        {
            id: 'draft',
            name: 'Drafting',
            icon: '✍️',
            description: 'Create first drafts of emails, reports, or proposals',
            category: 'Content Creation',
            useCase: 'Great for overcoming blank page syndrome'
        },
        {
            id: 'analyze',
            name: 'Analyzing',
            icon: '📊',
            description: 'Find patterns in data, feedback, or survey responses',
            category: 'Data Analysis',
            useCase: 'Ideal for making sense of large datasets'
        },
        {
            id: 'organize',
            name: 'Organizing',
            icon: '🗂️',
            description: 'Categorize information and create structure from chaos',
            category: 'Information Management',
            useCase: 'Essential for tackling disorganized information'
        },
        {
            id: 'translate',
            name: 'Translating',
            icon: '🌐',
            description: 'Convert content between languages or simplify technical jargon',
            category: 'Communication',
            useCase: 'Valuable for reaching diverse audiences'
        },
        {
            id: 'brainstorm',
            name: 'Brainstorming',
            icon: '💡',
            description: 'Generate ideas, solutions, or creative approaches',
            category: 'Ideation',
            useCase: 'Helpful when you need fresh perspectives'
        }
    ],

    // Color scheme and theming
    theme: {
        primary: '#1c487b',
        secondary: '#1ab1d2',
        accent: '#f18f38',
        background: '#fef4e3',
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c',
        text: '#333',
        textLight: '#666'
    },

    // Feature flags for enabling/disabling functionality
    features: {
        enableGamification: true,
        enableBadges: true,
        enableProgress: true,
        enableExport: true,
        enableCustomWorkflows: true,
        enableKeyboardShortcuts: true,
        enableAnalytics: false,
        enableSaveProgress: false
    },

    // Export and sharing options
    export: {
        includeMetadata: true,
        includeTimestamp: true,
        includeBranding: true,
        defaultFormat: 'pdf',
        filename: 'AI-Workflow-Enhancement-Plan'
    }
};

// Export configuration for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
} else {
    window.AppConfig = AppConfig;
}