console.log("Loaded minimal experiment.js at:", new Date());

// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        console.log("Experiment finished successfully!");
    }
});

// Define a single trial
const trial = {
    type: "html-keyboard-response",
    stimulus: "<p>Press any key to test jsPsych.</p>",
    choices: "ALL_KEYS" // Allow all key presses
};

// Define the timeline
const timeline = [trial];

// Debugging: Log the timeline
console.log("Timeline before run:", timeline);

// Run the experiment
try {
    jsPsych.run(timeline);
    console.log("Experiment ran successfully!");
} catch (error) {
    console.error("Error running experiment:", error);
}
