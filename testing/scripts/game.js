
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function isValidName(name) {
    if (name == "") {
      return false;
    }
    else {
        return true;
    }
}
