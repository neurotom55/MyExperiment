console.log("Loaded minimal experiment.js at:", new Date());

// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        console.log("Experiment finished successfully!");
    }
});

// Define a single trial with all properties explicitly set
const singleTrial = {
    type: "html-keyboard-response",
    stimulus: "<p>Press any key to confirm the experiment works.</p>",
    choices: "ALL_KEYS", // Allow all key presses
    response_ends_trial: true, // Ends trial after a response
    trial_duration: null, // No duration limit
    post_trial_gap: 0 // No gap between trials
};

// Define the timeline
const timeline = [singleTrial];

// Debugging: Log the timeline
console.log("Timeline before run:", timeline);

// Run the experiment
try {
    jsPsych.run(timeline);
    console.log("Experiment ran successfully!");
} catch (error) {
    console.error("Error running experiment:", error);
}
