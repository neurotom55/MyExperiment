// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData();
    }
});

// Define timeline
var timeline = [];

// Instructions
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>Welcome to the experiment.</p>" +
              "<p>Press the spacebar to continue.</p>",
    choices: [" "]
};
console.log("Pushing instructions:", instructions);
timeline.push(instructions);

// Simplified Trial
var trial = {
    type: "html-keyboard-response",
    stimulus: "<p>This is a test trial. Press any key to continue.</p>",
    choices: "ALL_KEYS"
};
console.log("Pushing trial:", trial);
timeline.push(trial);

// Run the experiment
console.log("Running experiment with timeline:", timeline);
jsPsych.run(timeline);
