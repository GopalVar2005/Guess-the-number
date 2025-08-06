// creating random number
let randomNumber = parseInt(Math.random() * 100 + 1);

// submit button
const submit = document.querySelector('#subt');
// user input->value
const userInput = document.querySelector('#guessField');
// guesses made
const guessSlot = document.querySelector('.guesses');
// guesses remaining
const remaining = document.querySelector('.lastResult');
// number is low or high
const lowOrhi = document.querySelector('.lowOrHi');
// if needed to hide or manipulate resultParas
const startOver = document.querySelector('.resultParas');

// to insert values
const p = document.createElement('p');

let prevGuess = []; // all guesses made so far
let numGuess = 1; // which guess

let playGame = true; // if player can play game or not

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    // console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  // if it is NaN or negative number or value out of range
  if (isNaN(guess)) {
    alert('Please enter a valid number.');
  } else if (guess > 100) {
    alert('Please enter a valid number.');
  } else if (guess < 1) {
    alert('Please enter a valid number.');
  } else {
    prevGuess.push(guess);
    displayGuess(guess);
    checkGuess(guess);

    // Only check for game over after checking the guess
    if (numGuess === 11 && guess !== randomNumber) {
      displayMessage(`Game Over, random number was ${randomNumber}`);
      endGame();
    }
    else if (numGuess === 11 && guess === randomNumber) {
      displayMessage('You guessed it right.');
      endGame();
    }
  }
}
function checkGuess(guess) {
  // message for guess
  if (guess == randomNumber) {
    displayMessage('You guessed it right.');
    endGame();
  } else if (guess < randomNumber) {
    displayMessage('Number is TOO low');
  } else if (guess > randomNumber) {
    displayMessage('Number is TOO high');
  }
}
function displayGuess(guess) {
  // empty the user value, update guesses and remaining
  userInput.value = '';
  guessSlot.innerHTML += `${guess} `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}
function displayMessage(message) {
  // lowOrHi
  lowOrhi.innerHTML = `<h2>${message}</h2>`;
}
function endGame() {
  userInput.value = '';
  // it requires key-value pairs
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = '<h2 id="newGame">Start New Game</h2>';
  startOver.appendChild(p);
  playGame = false;
  newGame();
}
function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}
