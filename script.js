'use strict';

//HTML elements

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--0');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

const checkDice = function () {
  if (playing) {
    //1  GENERAT A RANDO DICE ROLL
    //the Random dice roll basically does this
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice
    diceEl.classList.remove('hidden');
    //3. Check for rolled 1: if true , switch
    diceEl.src = `dice-${dice}.png`; // all png have same file, we just concatinate the string using the random number that we got.
    if (dice !== 1) {
      //add the number to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
};

const holdDice = function () {
  if (playing) {
    scores[activePlayer] = currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 1) {
      playing = false;
      diceEl.classList.add('hidden');
      //console.log(`Player ${activePlayer} won the game`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayers();
    }
  }
};

const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  activePlayer = 0;
  playing = true;
};

btnRoll.addEventListener('click', checkDice);
btnHold.addEventListener('click', holdDice);
btnNew.addEventListener('click', newGame);
