console.log("Loaded minimal experiment.js at:", new Date());

const jsPsych = initJsPsych({
    on_finish: function() {
        console.log("Experiment finished successfully!");
    }
});

// Define a single trial
const singleTrial = {
    type: "html-keyboard-response",
    stimulus: "<p>Press any key to confirm the experiment works.</p>",
    choices: "ALL_KEYS" // Allow any key press
};

// Add the trial to the timeline
const timeline = [singleTrial];

// Debugging: Log the timeline
console.log("Timeline before run:", timeline);

// Run the experiment
jsPsych.run(timeline);
