// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData(); // Display collected data at the end
    }
});

// Define the timeline
var timeline = [];

// Instructions screen
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>Welcome to the attentional blink experiment.</p>" +
              "<p>Press the spacebar to begin.</p>",
    choices: [" "]
};
timeline.push(instructions);

// Single trial to test functionality
var trial = {
    type: "html-keyboard-response",
    stimulus: "<p>This is a test trial.</p>" +
              "<p>Press any key to continue.</p>",
    choices: "ALL_KEYS", // Allow all key responses
    trial_duration: 1000 // Show the stimulus for 1 second
};
timeline.push(trial);

// Feedback screen
var feedback = {
    type: "html-keyboard-response",
    stimulus: "<p>Thank you for completing the test trial!</p>",
    choices: "NO_KEYS", // No keypress needed to move forward
    trial_duration: 2000 // Show feedback for 2 seconds
};
timeline.push(feedback);

// Start the experiment
jsPsych.run(timeline);
