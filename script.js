'use strict';

const scorePlayer1Element = document.querySelector('#score--0'),
      scorePlayer2Element = document.querySelector('#score--1'),
      player1 = document.querySelector('.player--0'),
      player2 = document.querySelector('.player--1'),
      currentScorePlayer1Element = document.querySelector('#current--0'),
      currentScorePlayer2Element = document.querySelector('#current--1'),
      dice = document.querySelector('.dice'),
      btnNewGame = document.querySelector('.btn--new'),
      btnRollDice = document.querySelector('.btn--roll'),
      btnHoldScore = document.querySelector('.btn--hold');

let scorePlayer = [0,0],
    currentScore = 0,
    activePlayer = 0;

newGame();

function newGame() {
    scorePlayer1Element.textContent = '0';
    scorePlayer2Element.textContent = '0';
    dice.classList.add('hidden');
    currentScorePlayer1Element.textContent = '0';
    currentScorePlayer2Element.textContent = '0';
    scorePlayer = [0,0];
    currentScore = 0;
};

const getRandomNumber = () =>  Math.trunc(Math.random() * 6 + 1);

function changePlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = '0';
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
};

btnRollDice.addEventListener('click', () => {
    const diceNumber = getRandomNumber();
    dice.classList.remove('hidden');
    dice.src = `/img/dice${diceNumber}.png`;

    if(diceNumber !== 1) {
        currentScore += diceNumber;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    }

    if(diceNumber === 1) changePlayer()
});

btnHoldScore.addEventListener('click', () => {
    scorePlayer[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scorePlayer[activePlayer];
    changePlayer();
});

btnNewGame.addEventListener('click', newGame);