document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const walrus = document.querySelectorAll(".walrus");
  const holes = document.querySelectorAll(".hole");
  const cardStart = document.querySelector(".card-start");
  const cardLeader = document.querySelector(".card-board");
  const scoreboard = document.querySelector(".scoreboard");
  const timer = document.querySelector("#time-left");
  const btnStart = document.querySelector("#btn-start");
  const btnSave = document.querySelector("#save-score");
  const playerNames = document.querySelectorAll(".player-name");
  const playerScores = document.querySelectorAll(".player-score");
  const cardHighscore = document.querySelector(".highscore");
  const highScoreName = document.querySelector("#highscore-name");
  let text = document.getElementById("warning");

  // Get the saved scores or an empty array from local storage
  const btnPlayAgain = document.querySelector("#btn-play-again");
  const btnLeaderboard = document.querySelector("#btn-leaderboard");
  const btnBack = document.querySelector("#btn-back");
  const hitAudio = document.querySelector(".whack");

  // Create an empty array to store the high scores
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  let countdown;
  let score = 0;
  let lastHole;
  let timeOut = false;

  // Get random walrus in randow hole for a random time
  // Get random hole
  function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    // If it's the same hole run the function again
    if (hole === lastHole) {
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  // Generate a random time for mole to stay up

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  // Get a Walrus to pop up

  function popUp() {
    // Random hole
    const holeUp = randomHole(holes);

    // Get random time function in
    const timeUp = randomTime(300, 1500);

    // add .up to hole class
    holeUp.classList.add("up");
    setTimeout(function () {
      holeUp.classList.remove("up");
      if (!timeOut) popUp();
    }, timeUp);
  }

  // Function to start and stop game

  function startGame() {
    // Hide Welcome card when start game is pressed
    cardStart.classList.add("game-on");
    score = 0;
    scoreboard.textContent = score;
    timer.textContent = 20;
    timeOut = false;
    popUp();
    setTimeout(function () {
      timeOut = true;
      // Add if score is greater than high scores here
      cardHighscore.classList.remove("game-on");
    }, 20000);
  }

  // When leaderboard button is pressed

  function leaderboard() {
    cardLeader.classList.add("scoreboard");
    cardLeader.classList.remove("game-on");
    cardStart.classList.add("game-on");
  }

  // When back button on Leaderboard is pressed

  function backToStart() {
    text.innerHTML = "";
    cardLeader.classList.remove("scoreboard");
    cardLeader.classList.add("game-on");
    cardStart.classList.remove("game-on");
  }

  // Submit name to Highscores
  // Display msg if player name value is empty

  function formValue() {
    let name = document.forms["leader"]["name"].value;

    if (name == "") {
      text.innerHTML = "Please enter a name";
      return false;
    } else {
      cardLeader.classList.add("scoreboard");
      cardLeader.classList.remove("game-on");
      cardStart.classList.add("game-on");
      cardHighscore.classList.add("game-on");
      return true;
    }
  }

  // When playAgain button is pressed
  function playAgain() {
    text.innerHTML = "";
    cardHighscore.classList.add("game-on");
  }

  // Countdown Timer

  function countdownTimer() {
    let timeLeft = 20;
    countdown = setInterval(() => {
      //   <=1 to stop time going negative from timeout fix
      if (timeLeft <= 1) {
        clearInterval(countdown);
      }
      // Subtract 1 to align seconds and timeout
      timer.textContent = timeLeft - 1;
      timeLeft -= 1;
    }, 1000);
  }

  // Register and count the whacks in the scoreboard

  function whack(e) {
    score++;
    // If hit, play sound
    hitAudio.play();

    // Bring walrus down once clicked
    this.parentElement.classList.remove("up");
    scoreboard.textContent = score;
  }

  // Save a High score and position in leaderboard

  // Help from James Q Quick video on Saving High Scores in Local Storage
  function saveHighScore(e) {
    // Save the current score into an array
    const currentScore = {
      name: highScoreName.value,
      score: scoreboard.textContent,
    };

    // push current score into highscore array
    highScores.push(currentScore);

    // Sort higher scores to the top and only accept top 5
    highScores.sort((a, b) => b.score - a.score);
    // Help from Samantha from Code Institute Tutor support
    highScores.splice(5);

    // Iterate through the current leaderboard and replace score with if beaten
    // Help from Michael on Code Institute Tutor support
    for (let i = 0; i < highScores.length; i++) {
      playerScores[i].textContent = highScores[i].score;
      playerNames[i].textContent = highScores[i].name;
    }

    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  btnStart.addEventListener("click", startGame);
  btnStart.addEventListener("click", countdownTimer);
  btnSave.addEventListener("click", saveHighScore);
  btnSave.addEventListener("click", formValue);
  highScoreName.addEventListener("keyup", () => {
    highScoreName.value;
  });
  btnPlayAgain.addEventListener("click", startGame);
  btnPlayAgain.addEventListener("click", countdownTimer);
  btnPlayAgain.addEventListener("click", playAgain);
  btnLeaderboard.addEventListener("click", leaderboard);
  btnBack.addEventListener("click", backToStart);
  walrus.forEach((item) => item.addEventListener("click", whack));
});
