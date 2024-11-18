console.log("Loaded minimal experiment.js at:", new Date());

const jsPsych = initJsPsych({
    on_finish: function() {
        console.log("Experiment finished successfully!");
    }
});

// Define a single, basic trial
const singleTrial = {
    type: "html-keyboard-response",
    stimulus: "<p>Press any key to confirm this trial works.</p>",
    choices: "ALL_KEYS" // Allow all key presses
};

// Add the trial to the timeline
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
