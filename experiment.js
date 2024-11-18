// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData(); // Display collected data at the end
    }
});

// Define a simple timeline
const timeline = [];

// Single basic trial
const simpleTrial = {
    type: "html-keyboard-response",
    stimulus: "<p>This is a simple trial. Press any key to continue.</p>",
    choices: "ALL_KEYS"
};
timeline.push(simpleTrial);

// Run the experiment
jsPsych.run(timeline);
