const intervalDurationInput = document.getElementById("interval-duration");
const numberOfCyclesInput = document.getElementById("number-of-cycles");
const totalSessionTimeDisplay = document.getElementById("total-session-time");
const intervalDisplay = document.getElementById("interval-display");
const timeRemainingDisplay = document.getElementById("time-remaining");

const startBtn = document.getElementById("start-timer");
const stopBtn = document.getElementById("stop-timer");
const pauseBtn = document.getElementById("pause-timer");
const resumeBtn = document.getElementById("resume-timer");
const resetBtn = document.getElementById("reset-timer");

let intervalId;
let timeRemaining;
let cyclesRemaining;
let isPaused = false;

function updateTotalSessionTime() {
  const minutes = Math.floor(intervalDurationInput.value * numberOfCyclesInput.value / 60);
  const seconds = (intervalDurationInput.value * numberOfCyclesInput.value) % 60;
  totalSessionTimeDisplay.textContent = `${minutes}m ${seconds}s`;
}

function startTimer() {
  timeRemaining = intervalDurationInput.value;
  cyclesRemaining = numberOfCyclesInput.value;
  intervalDisplay.textContent = `Interval: ${cyclesRemaining}`;
  timeRemainingDisplay.textContent = timeRemaining;

  intervalId = setInterval(() => {
    if (!isPaused) {
      timeRemaining--;
      timeRemainingDisplay.textContent = timeRemaining;

      if (timeRemaining <= 0) {
        playChime();
        cyclesRemaining--;

        if (cyclesRemaining > 0) {
          timeRemaining = intervalDurationInput.value;
          intervalDisplay.textContent = `Interval: ${cyclesRemaining}`;
        } else {
          stopTimer();
          playCompleted();
        }
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  timeRemainingDisplay.textContent = "";
  intervalDisplay.textContent = "";
  updateTotalSessionTime();
}

function pauseTimer() {
  isPaused = true;
}

function resumeTimer() {
  isPaused = false;
}

function resetTimer() {
  intervalDurationInput.value = 30;
  numberOfCyclesInput.value = 5;
  updateTotalSessionTime();
}

function playClick() {
  const audio = new Audio("click.mp3");
  audio.play();
}

function playChime() {
  const audio = new Audio("chime_01.mp3");
  audio.play();
}

function playCompleted() {
  const audio = new Audio("completed.mp3");
  audio.play();
}

startBtn.addEventListener("click", () => {
  playClick();
  startTimer();
});

stopBtn.addEventListener("click", () => {
  playClick();
  stopTimer();
});

pauseBtn.addEventListener("click", () => {
  playClick();
  pauseTimer();
});

resumeBtn.addEventListener("click", () => {
  playClick();
  resumeTimer();
});

resetBtn.addEventListener("click", () => {
  playClick();
  resetTimer();
});

intervalDurationInput.addEventListener("change", updateTotalSessionTime);
numberOfCyclesInput.addEventListener("change", updateTotalSessionTime);

updateTotalSessionTime();