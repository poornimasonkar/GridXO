document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const restartBtn = document.getElementById("restart");
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");

  let currentPlayer = "X";
  let gameActive = true;
  let board = ["", "", "", "", "", "", "", "", ""];

  const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function handleCellClick() {
    const index = this.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);

    checkWinner();
  }

  function checkWinner() {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        gameActive = false;

        cells[a].classList.add("win");
        cells[b].classList.add("win");
        cells[c].classList.add("win");

        popupText.textContent = `🎉 Congratulations! Player ${currentPlayer} Wins!`;
        popup.style.display = "block";
        return;
      }
    }

    if (!board.includes("")) {
      popupText.textContent = "😐 It's a Draw!";
      popup.style.display = "block";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }

  window.closePopup = function () {
    popup.style.display = "none";
    restartGame();
  };

  function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "Player X's turn";

    cells.forEach(cell => {
      cell.textContent = "";
      cell.className = "cell";
    });
  }

  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  restartBtn.addEventListener("click", restartGame);
});