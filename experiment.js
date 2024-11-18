console.log("Loaded minimal experiment.js at:", new Date());

const jsPsych = initJsPsych({
    on_finish: function() {
        console.log("Experiment finished successfully!");
    }
});

const timeline = [
    {
        type: "html-keyboard-response",
        stimulus: "<p>This is a minimal test trial. Press any key to continue.</p>",
        choices: "ALL_KEYS"
    }
];

console.log("Timeline before run:", timeline);

jsPsych.run(timeline);
