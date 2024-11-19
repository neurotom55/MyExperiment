const jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.displayData();
  }
});

let targetGap = 3; // Initial gap between targets
const minGap = 2;
const maxGap = 5;

function createStimuli() {
  const stimuli = [];
  const firstTarget = Math.floor(Math.random() * 10).toString(); // First target: random digit
  const secondTarget = Math.floor(Math.random() * 10).toString(); // Second target: random digit

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
  return { stimuli, firstTarget, secondTarget };
}

function createRapidPresentationTimeline() {
  const { stimuli, firstTarget, secondTarget } = createStimuli();
  jsPsych.data.addProperties({ firstTarget, secondTarget });

  return stimuli.map((item) => ({
    type: 'html-keyboard-response',
    stimulus: `<p style="font-size:48px; color:${item.color}">${item.stimulus}</p>`,
    choices: jsPsych.NO_KEYS,
    trial_duration: 150,
  }));
}

const rapidPresentationTrial = {
  timeline: createRapidPresentationTimeline(),
};

const responseTrial = {
  type: 'html-keyboard-response',
  stimulus: '<p>What was the second number you saw?</p>',
  choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
};

const feedbackTrial = {
  type: 'html-keyboard-response',
  stimulus: function() {
    const response = jsPsych.data.get().last(1).values()[0].response;
    const isCorrect = response === secondTarget;

    if (isCorrect) {
      targetGap = Math.max(minGap, targetGap - 1); // Decrease gap if correct
      return '<p style="color:green">Correct!</p>';
    } else {
      targetGap = Math.min(maxGap, targetGap + 1); // Increase gap if incorrect
      return '<p style="color:red">Incorrect.</p>';
    }
  },
  choices: jsPsych.NO_KEYS,
  trial_duration: 2000,
};

const trialProcedure = {
  timeline: [rapidPresentationTrial, responseTrial, feedbackTrial],
  repetitions: 10, // Adjust the number of repetitions as needed
};

jsPsych.run(trialProcedure);
