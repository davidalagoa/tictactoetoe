const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMB = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
};


function handleClick(e) {;
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    // check for win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns();
        setBoardHoverClass();
    }
};

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
};

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
};

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }

};

function checkWin(currentClass) {
    return WINNING_COMB.some(comb => {
        return comb.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
};


// let origBoard;
// const huPlayer = 'O';
// const aiPlayer = 'X';
// const winCombos = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [6, 4, 2]
// ]

// const cells = document.querySelectorAll('.cell');

// startGame();

// function startGame() {
//     document.querySelector('.endgame').style.display = "none";
//     origBoard = Array.from(Array(9).keys());
//     for (let i = 0; i < cells.length; i++) {
//         cells[i].innerText = '';
//         cells[i].style.removeProperty('background-color');
//         cells[i].addEventListener('click', turnClick, false);
//     }
// }

// function turnClick(square) {
//     if (typeof origBoard[square.target.id] == 'number') {
//         turn(square.target.id, huPlayer);
//         if (!checkTie()) turn(bestSpot(), aiPlayer);
//     }
// };

// function turn(squareID, player) {
//     origBoard[squareID] = player;
//     document.getElementById(squareID).innerText = player;
//     let gameWon = checkWin(origBoard, player);
//     if (gameWon) gameOver(gameWon);
// };

// function checkWin(board, player) {
//     let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
//     let gameWon = null;
//     for (let [index, win] of winCombos.entries()) {
//         if (win.every(elem => plays.indexOf(elem) > -1)) {
//             gameWon = { index: index, player: player };
//             break;
//         }
//     }
//     return gameWon;
// };

// function gameOver(gameWon) {
//     for (let index of winCombos[gameWon.index]) {
//         document.getElementById(index).style.backgroundColor =
//             gameWon.player == huPlayer ? "blue" : "red";
//     }

//     for (let i = 0; i < cells.length; i++) {
//         cells[i].removeEventListener('click', turnClick, false);
//     }
//     declareWinner(gameWon.player == huPlayer ? "You Win!" : "You Lose!")
// };

// function declareWinner(who) {
//     document.querySelector('.endgame').style.display = "block";
//     document.querySelector('.endgame .text').innerText = who;

// }

// function emptySquares() {
//     return origBoard.filter(s => typeof s == 'number');
// }

// function bestSpot() {
//     return emptySquares()[0];
// }

// function checkTie() {
//     if (emptySquares().length == 0) {
//         for (let i = 0; i < cells.length; i++) {
//             cells[i].style.backgroundColor = "green";
//             cells[i].removeEventListener('click', turnClick, false);
//         }
//         declareWinner("Tie Game!")
//         return true;
//     }
//     return false;
// }