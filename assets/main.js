const walrus = document.querySelectorAll(".walrus");
const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".scoreboard");
const time = document.querySelector(".countdown");
const card = document.querySelector('.card-info');
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
    holeUp.classList.add('up');
    setTimeout(function() {
        holeUp.classList.remove('up');
        if(!timeOut) popUp();
    }, timeUp);    
}

// Function to start and stop game

function startGame() {
    // Hide Welcome card when start game is pressed
    card.classList.add("game-on");
    score.textContent = 0;
    time.textContent = 20;
    timeOut = false
    popUp();
    setTimeout(function() {
        timeOut = true;
        // Show Welcome card when game is over
        card.classList.remove("game-on");
    }, 20000);
}

// Register and count the whacks

function whack(e) {
    console.log(e);
}

walrus.forEach(item => item.addEventListener('click', whack));