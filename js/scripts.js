/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const turnText = document.getElementById('turn');
const message = document.getElementById('message');
const winnerText = document.getElementById('winnerText');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  isXTurn = true;
  turnText.textContent = "Player X's turn";
  message.style.display = "none";
  winnerText.textContent = "";

  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
    turnText.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination =>
    combination.every(index =>
      cells[index].classList.contains(currentClass)
    )
  );
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('X') || cell.classList.contains('O')
  );
}

function endGame(draw) {
  if (draw) {
    winnerText.textContent = "It's a draw!";
  } else {
    winnerText.textContent = `Player ${isXTurn ? 'X' : 'O'} wins!`;
  }
  message.style.display = 'block';
}

restartButton.addEventListener('click', startGame);
