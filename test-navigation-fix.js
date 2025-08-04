// Test script to verify navigation fix
// Run this in the browser console after loading test-mission2.html

function testNavigationFix() {
    console.log('=== Testing Navigation Fix ===');
    
    if (!window.app) {
        console.error('App not found. Make sure test-mission2.html is loaded.');
        return;
    }
    
    // Reset app to start fresh
    app.reset();
    console.log('App reset');
    
    // Start detective work (go to level 1)
    app.startDetectiveWork();
    console.log('Started detective work, current level:', app.state.currentLevel);
    
    // Select a workflow
    app.selectWorkflow('meetings');
    console.log('Selected meetings workflow');
    
    // Move to level 2 (pain points)
    console.log('Attempting to move to level 2...');
    app.nextLevel();
    console.log('Current level after first nextLevel():', app.state.currentLevel);
    
    // Add a pain point
    const painPointInput = document.getElementById('painPointInput');
    if (painPointInput) {
        painPointInput.value = 'Test pain point - difficult to track meeting action items';
        app.addPainPoint();
        console.log('Added pain point, total pain points:', app.state.painPoints.length);
    } else {
        console.error('Pain point input not found');
        return;
    }
    
    // Select the pain point
    app.selectPainPoint(0);
    console.log('Selected pain point at index 0, currentPainPointIndex:', app.state.currentPainPointIndex);
    
    // Check if we can proceed
    const canProceed = app.canProceed();
    console.log('Can proceed from level 2:', canProceed);
    
    // Check button state
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        console.log('Next button found, disabled:', nextBtn.disabled);
        console.log('Next button text:', nextBtn.innerHTML);
    } else {
        console.error('Next button not found');
        return;
    }
    
    // Try to move to level 3 (solutions)
    console.log('Attempting to move to level 3...');
    app.nextLevel();
    console.log('Current level after second nextLevel():', app.state.currentLevel);
    
    if (app.state.currentLevel === 3) {
        console.log('✅ SUCCESS: Navigation from Mission 2 to Mission 3 works!');
    } else {
        console.log('❌ FAILED: Still stuck at level', app.state.currentLevel);
    }
    
    console.log('=== Test Complete ===');
}

// Auto-run the test if app is available
if (typeof window !== 'undefined' && window.app) {
    setTimeout(testNavigationFix, 1000);
} else {
    console.log('Test script loaded. Run testNavigationFix() when app is ready.');
}