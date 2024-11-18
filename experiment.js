// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData(); // Display collected data at the end
    }
});

// Define timeline
var timeline = [];

// Debugging log
console.log("Initializing timeline...");

// Instructions
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>Welcome to the experiment.</p><p>Press any key to continue.</p>",
    choices: "ALL_KEYS"
};
console.log("Pushing instructions:", instructions);
timeline.push(instructions);

// Simple test trial
var testTrial = {
    type: "html-keyboard-response",
    stimulus: "<p>This is a simple test trial.</p>",
    choices: "ALL_KEYS"
};
console.log("Pushing testTrial:", testTrial);
timeline.push(testTrial);

// Feedback trial
var feedback = {
    type: "html-keyboard-response",
    stimulus: "<p>Thank you for participating!</p>",
    choices: "NO_KEYS",
    trial_duration: 2000
};
console.log("Pushing feedback:", feedback);
timeline.push(feedback);

// Debugging log
console.log("Final timeline:", timeline);

// Run the experiment
console.log("Starting experiment...");
jsPsych.run(timeline);
