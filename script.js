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

let scorePlayer, currentScore, activePlayer, isPlaying;

newGame();

function newGame() {
    scorePlayer1Element.textContent = 0;
    scorePlayer2Element.textContent = 0;
    currentScorePlayer1Element.textContent = 0;
    currentScorePlayer2Element.textContent = 0;

    dice.classList.add('hidden');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');

    scorePlayer = [0,0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;
};

const getRandomNumber = () =>  Math.trunc(Math.random() * 6 + 1);

function changePlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
};

btnRollDice.addEventListener('click', () => {
    if(isPlaying){
        const diceNumber = getRandomNumber();
        dice.classList.remove('hidden');
        dice.src = `/img/dice${diceNumber}.png`;
    
        if(diceNumber !== 1) {
            currentScore += diceNumber;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
    
        if(diceNumber === 1) changePlayer()
    }

});

btnHoldScore.addEventListener('click', () => {
    if(isPlaying){
        scorePlayer[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scorePlayer[activePlayer];
    
        if(scorePlayer[activePlayer] >= 10) {
            isPlaying = false;
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        }
    
        changePlayer();
    }
});

btnNewGame.addEventListener('click', newGame);