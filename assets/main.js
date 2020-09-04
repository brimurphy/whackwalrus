const walrus = document.querySelectorAll(".walrus");
const holes = document.querySelectorAll(".hole");
let lastHole;
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
    const timeUp = randomTime(300, 3000);
    // console.log(holeUp, timeUp);
    // add .up to walrus class
    holeUp.classList.add('up');
    setTimeout(function() {
        holeUp.classList.remove('up');
    }, timeUp);    
}
