console.log("Loaded attentional blink experiment.js at:", new Date());

// Initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: function () {
        console.log("Experiment finished successfully!");
        jsPsych.data.displayData();
    }
});

// Variables
let firstTarget = null;
let secondTarget = null;
let targetGap = 3; // Initial gap between targets
const minGap = 2;
const maxGap = 5;

// Function to create stimuli
function createStimuli() {
    const stimuli = [];
    firstTarget = Math.floor(Math.random() * 10).toString(); // First target: random digit
    secondTarget = Math.floor(Math.random() * 10).toString(); // Second target: random digit

    for (let i = 0; i < 20; i++) {
        if (i === 5) {
            stimuli.push({ stimulus: firstTarget, color: "red" });
        } else if (i === 5 + targetGap) {
            stimuli.push({ stimulus: secondTarget, color: "white" });
        } else {
            const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter
            stimuli.push({ stimulus: letter, color: "white" });
        }
    }
    return stimuli;
}

// Trial to present stimuli
const rapidPresentationTrial = {
    timeline: [],
    on_timeline_start: function () {
        const stimuli = createStimuli();
        this.timeline = stimuli.map((item) => ({
            type: "html-keyboard-response",
            stimulus: `<p style="font-size:48px; color:${item.color}">${item.stimulus}</p>`,
            choices: "NO_KEYS",
            trial_duration: 150
        }));
    }
};

// Response trial
const responseTrial = {
    type: "survey-html-form",
    preamble: "<p>What was the second number you saw?</p>",
    html: '<input name="response" type="text" autocomplete="off" />',
    button_label: "Submit",
    on_finish: function (data) {
        const response = data.response.response;
        const isCorrect = response === secondTarget;
        console.log("Response:", response, "Correct:", isCorrect);

        if (isCorrect) {
            targetGap = Math.max(minGap, targetGap - 1); // Decrease gap if correct
        } else {
            targetGap = Math.min(maxGap, targetGap + 1); // Increase gap if incorrect
        }
    }
};

// Feedback trial
const feedbackTrial = {
    type: "html-keyboard-response",
    stimulus: function () {
        const lastTrial = jsPsych.data.get().last(1).values()[0];
        return lastTrial.response.response === secondTarget
            ? "<p style='color:green'>Correct!</p>"
            : "<p style='color:red'>Incorrect.</p>";
    },
    choices: "NO_KEYS",
    trial_duration: 2000
};

// Timeline
const timeline = [
    {
        type: "html-keyboard-response",
