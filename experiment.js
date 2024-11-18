console.log("Loaded minimal experiment.js at:", new Date());

// Initialize jsPsych (introduced in v7.0.0)
const jsPsych = initJsPsych({
    on_finish: function() {
        console.log("Experiment finished successfully!");
    }
});

// Define a single trial
const singleTrial = {
    type: "html-keyboard-response",
    stimulus: "<p>Press any key to continue.</p>",
    choices: "ALL_KEYS" // Allow all key presses
};

// Define the timeline
const timeline = [singleTrial];

// Debugging: Log the timeline
console.log("Timeline before run:", timeline);

// Run the experiment
jsPsych.run(timeline);
