console.log("Loaded minimal experiment.js at:", new Date());

const jsPsych = initJsPsych({
    on_finish: function() {
        console.log("Experiment finished successfully!");
    }
});

// Define a single trial
const trial = {
    type: "html-keyboard-response",
    stimulus: "<p>Press any key to confirm the experiment works.</p>",
    choices: "ALL_KEYS"
};

// Debugging: Ensure the plugin exists
if (typeof jsPsych.plugins["html-keyboard-response"] === "undefined") {
    console.error("Plugin 'html-keyboard-response' is not loaded or defined!");
} else {
    console.log("Plugin 'html-keyboard-response' loaded successfully:", jsPsych.plugins["html-keyboard-response"]);
}

// Define the timeline
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
