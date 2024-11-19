console.log("Loaded minimal experiment.js at:", new Date());

// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        console.log("Experiment finished successfully!");
    }
});

// Define a blank trial
const trial = {};

// Define the timeline with the blank trial
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
