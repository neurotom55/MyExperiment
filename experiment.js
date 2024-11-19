console.log("Loaded minimal experiment.js at:", new Date());

// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function () {
        console.log("Experiment finished successfully!");
        jsPsych.data.displayData();
    }
});

// Minimal timeline
const timeline = [
    {
        type: "html-keyboard-response",
        stimulus: "<p>Press any key to continue.</p>",
        choices: "ALL_KEYS"
    }
];

// Run the experiment
console.log("Timeline before run:", timeline);
jsPsych.run(timeline);
