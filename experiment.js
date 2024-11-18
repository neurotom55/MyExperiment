// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData(); // Display collected data
    }
});

// Define timeline array
var timeline = [];

// Define variables
var first_target = null;
var second_target = null;

// Instructions
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
var target_gap = 3;
var min_gap = 2;
var max_gap = 5;

// Generate trial stimuli
function createTrial() {
    var stimuli = [];
    first_target = Math.floor(Math.random() * 10).toString();
    second_target = Math.floor(Math.random() * 10).toString();

    for (var i = 0; i < 20; i++) {
        if (i === 5) {
            stimuli.push({ stimulus: first_target, color: 'red' });
        } else if (i === 5 + target_gap) {
            stimuli.push({ stimulus: second_target, color: 'white' });
        } else {
            var letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            stimuli.push({ stimulus: letter, color: 'white' });
        }
    }
    return stimuli;
}

// Stimulus display phase
var stimulus_phase = {
    timeline: [],
    on_timeline_start: function() {
        var stimuli = createTrial();
        this.timeline = stimuli.map(function(item) {
            return {
                type: "html-keyboard-response",
                stimulus: `<p style="font-size:48px; color:${item.color}">${item.stimulus}</p>`,
                choices: "NO_KEYS",
                trial_duration: stimulus_duration
            };
        });
    }
};
timeline.push(stimulus_phase);

// User response
var response_screen = {
    type: "survey-html-form",
    preamble: "<p>What was the second number you saw?</p>",
    html: '<input name="response" type="text" autocomplete="off"/>',
    button_label: "Submit",
    on_finish: function(data) {
        var response = data.response.response;
        data.correct = (response === second_target);
        target_gap = data.correct
            ? Math.max(min_gap, target_gap - 1)
            : Math.min(max_gap, target_gap + 1);
    }
};
timeline.push(response_screen);

// Feedback screen
var feedback = {
    type: "html-keyboard-response",
    stimulus: function() {
        var correct = jsPsych.data.getLastTrialData().values()[0].correct;
        return correct
            ? "<p style='color:green'>Correct!</p>"
            : "<p style='color:red'>Incorrect.</p>";
    },
    choices: "NO_KEYS",
    trial_duration: 2000
};
timeline.push(feedback);

// Run the experiment
jsPsych.run(timeline);