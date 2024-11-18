// Debugging: Verify file loading
console.log("Loaded minimal experiment.js at:", new Date());

// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        console.log("Experiment finished successfully!");
    }
});

// Define a single trial
const testTrial = {
    type: "html-keyboard-response",
    stimulus: "<p>Press any key to confirm this trial works.</p>",
    choices: "ALL_KEYS"
};

// Define timeline
const timeline = [testTrial];

// Debugging: Log the timeline
console.log("Timeline before run:", timeline);

// Run the experiment
jsPsych.run(timeline);
