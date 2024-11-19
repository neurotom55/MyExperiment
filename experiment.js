console.log("Loaded custom experiment.js at:", new Date());

// Function to initialize the experiment
function runExperiment() {
    console.log("Experiment started!");

    // Get the jsPsych target div
    const targetDiv = document.getElementById("jspsych-target");

    // Clear the div
    targetDiv.innerHTML = "";

    // Create a stimulus
    const stimulus = document.createElement("p");
    stimulus.innerText = "Press any key to continue.";
    stimulus.style.fontSize = "24px";
    stimulus.style.textAlign = "center";
    targetDiv.appendChild(stimulus);

    // Add a keypress event listener
    document.addEventListener("keydown", (event) => {
        console.log(`Key pressed: ${event.key}`);
        endExperiment(targetDiv, event.key);
    }, { once: true }); // `once: true` ensures the listener runs only once
}

// Function to end the experiment
function endExperiment(targetDiv, keyPressed) {
    console.log("Experiment ended. Key pressed:", keyPressed);

    // Clear the div
    targetDiv.innerHTML = "";

    // Show a message
    const result = document.createElement("p");
    result.innerText = `You pressed: ${keyPressed}`;
    result.style.fontSize = "24px";
    result.style.textAlign = "center";
    targetDiv.appendChild(result);

    // Log experiment completion
    console.log("Experiment finished successfully!");
}

// Start the experiment
runExperiment();
