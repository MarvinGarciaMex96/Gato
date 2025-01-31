const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const cells = [];
let currentPlayer = 'X';
let gameActive = true;

// Crear el tablero
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
}

// Manejar el clic en una celda
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (cells[index].textContent === '' && gameActive) {
        cells[index].textContent = currentPlayer;
        if (checkWin()) {
            statusText.textContent = `¡Jugador ${currentPlayer} ha ganado!`;
            gameActive = false;
        } else if (checkDraw()) {
            statusText.textContent = '¡Empate!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Turno del jugador ${currentPlayer}`;
        }
    }
}

// Verificar si hay un ganador
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

// Verificar si hay un empate
function checkDraw() {
    return cells.every(cell => cell.textContent !== '');
}

// Reiniciar el juego
resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Turno del jugador ${currentPlayer}`;
});

// Iniciar el juego
statusText.textContent = `Turno del jugador ${currentPlayer}`;
