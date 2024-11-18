// experiment.js

// Define timeline array to store experiment steps
var timeline = [];

// Define variables to hold the target values
var first_target = null;
var second_target = null;

// Instruction screen
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>Welcome to the attentional blink experiment.</p>" +
              "<p>Press the spacebar to continue.</p>",
    choices: [" "]
};
timeline.push(instructions);

// Trial parameters
var stimulus_duration = 150;
var interstimulus_interval = 100;
var target_gap = 3; // Initial gap between first and second target
var min_gap = 2;
var max_gap = 5;

// Function to create a trial with distractors and two targets
function createTrial() {
    var stimuli = [];
    first_target = Math.floor(Math.random() * 10).toString();  // First target as a random digit
    second_target = Math.floor(Math.random() * 10).toString(); // Second target as a different random digit

    // Generate distractor letters and insert targets
    for (var i = 0; i < 20; i++) {
        if (i === 5) {
            stimuli.push({stimulus: first_target, color: 'red'});
        } else if (i === 5 + target_gap) {
            stimuli.push({stimulus: second_target, color: 'white'});
        } else {
            var letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter
            stimuli.push({stimulus: letter, color: 'white'});
        }
    }

    return stimuli;
}

// Add stimulus display phase to the timeline
var stimulus_phase = {
    timeline: [], // This will be populated dynamically
    on_timeline_start: function() {
        var stimuli = createTrial(); // Create the trial stimuli
        this.timeline = stimuli.map(function(item) {
            return {
                type: 'html-keyboard-response',
                stimulus: `<p style="font-size:48px; color:${item.color}">${item.stimulus}</p>`,
                choices: "NO_KEYS", // Updated for jsPsych v7
                trial_duration: stimulus_duration
            };
        });
    }
};
timeline.push(stimulus_phase);

// Add user response screen for the second target
var response_screen = {
    type: "survey-html-form",
    preamble: "<p>What was the second number you saw?</p>",
    html: '<input name="response" type="text" autocomplete="off"/>',
    button_label: "Submit",
    on_finish: function(data) {
        var response = data.response.response; // Get the response value
        data.correct = (response === second_target); // Check if response is correct
        if (data.correct) {
            target_gap = Math.max(min_gap, target_gap - 1); // Make task harder if correct
        } else {
            target_gap = Math.min(max_gap, target_gap + 1); // Make task easier if incorrect
        }
    }
};
timeline.push(response_screen);

// Feedback screen
var feedback = {
    type: "html-keyboard-response",
    stimulus: function() {
        var correct = jsPsych.data.getLastTrialData().values()[0].correct;
        return correct ? "<p style='color:green'>Correct!</p>" :
