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

  // Leaderboard button

  function leaderboard() {
    cardLeader.classList.add("scoreboard");
    cardLeader.classList.remove("game-on");
    cardStart.classList.add("game-on");
  }

  // Back button on Leaderboard

  function backToStart() {
    cardLeader.classList.remove("scoreboard");
    cardLeader.classList.add("game-on");
    cardStart.classList.remove("game-on");
  }

  function submitScore() {
    cardLeader.classList.add("scoreboard");
    cardLeader.classList.remove("game-on");
    cardStart.classList.add("game-on");
    cardHighscore.classList.add("game-on");
  }

  function playAgain() {
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

  // Save a High score
  // Help from James Q Quick video on Saving High Scores in Local Storage
  function saveHighScore(e) {
    // Save the current score into an array
    const currentScore = {
      name: highScoreName.value,
      score: scoreboard.textContent,
    };
    
    // push current score into highscore array
    highScores.push(currentScore);

    // Sort higher scores to the top
    highScores.sort((a, b) => b.score - a.score);
    // Iterate through the current leaderboard and replace score with if beaten
    // Help from Michael on Tutor support to get figure out
    for (let i = 0; i < highScores.length; i++) {
      playerScores[i].textContent = highScores[i].score;
      playerNames[i].textContent = highScores[i].name;
    }
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  // Display msg if leaderboard value is empty

//   function formValue() {
//     var name = document.forms["leader"]["name"].value;
//     if (name == "") {
//         alert("Please enter a name")
//         return false
//     }
//   }

  btnStart.addEventListener("click", startGame);
  btnStart.addEventListener("click", countdownTimer);
  btnSave.addEventListener("click", saveHighScore);
  btnSave.addEventListener("click", submitScore);
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
