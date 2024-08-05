"use strict";

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceImageEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");

let mainScore, score, activePlayer, playing;

const init = function () {
  mainScore = [0, 0];
  score = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceImageEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  score = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

diceImageEl.classList.add("hidden");

btnRoll.addEventListener("click", function () {
  if (playing) {
    let getRandomNumber = Math.trunc(Math.random() * 6 + 1);

    diceImageEl.classList.remove("hidden");
    diceImageEl.src = `images/dice-${getRandomNumber}.png`;

    if (getRandomNumber !== 1) {
      score += getRandomNumber;
      document.getElementById(`current--${activePlayer}`).textContent = score;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    mainScore[activePlayer] += score;
    document.getElementById(`score--${activePlayer}`).textContent =
      mainScore[activePlayer];
    if (mainScore[activePlayer] >= 100) {
      playing = false;
      diceImageEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }

    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
