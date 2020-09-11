const walrus = document.querySelectorAll(".walrus");
const holes = document.querySelectorAll(".hole");
const cardStart = document.querySelector(".card-start");
const cardLeader = document.querySelector(".card-board");
const scoreboard = document.querySelector(".scoreboard");
// let time = document.querySelector(".countdown");
const timer = document.querySelector("#time-left");
const btnStart = document.querySelector("#btn-start");
const btnLeaderboard = document.querySelector("#btn-leaderboard");
const btnBack = document.querySelector("#btn-back");
let timeLeft = 20;
let countdown;
let score = 0;

//  console.log(card);
// console.log(score.textContent);
// console.log(time);
let lastHole;
let timeOut = false;
// console.log(walrus);
// console.log(hole);

// Get random walrus in randow hole for a random time

// Get random hole
function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  // console.log(index, hole);

  // If it's the same hole run the function again
  if (hole === lastHole) {
    console.log("wow");
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
  // console.log(holeUp, timeUp);
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
  scoreboard.textContent = 0;
  timer.textContent = 20;
  timeOut = false;
  popUp();
  setTimeout(function () {
    timeOut = true;
    // Show Welcome card when game is over
    cardStart.classList.remove("game-on");
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
  //  console.log(e);
  score++;
  // Bring walrus down once clicked
  this.parentElement.classList.remove("up");
  console.dir(this.parentElement);
  scoreboard.textContent = score;
}

btnStart.addEventListener("click", startGame);
btnStart.addEventListener("click", countdownTimer);
btnLeaderboard.addEventListener("click", leaderboard);
btnBack.addEventListener("click", backToStart);
walrus.forEach((item) => item.addEventListener("click", whack));
