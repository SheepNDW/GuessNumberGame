let randomNum = Math.floor(Math.random() * 100) + 1;

const guess = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.getElementById("guessSubmit");
const guessField = document.getElementById("guessField");

let guessCount = 1;
let restartBtn;
let max = 100;
let min = 1;

// checkWin 檢查有沒有贏
function checkWin(playerGuess) {
  if (playerGuess === randomNum) {
    return true;
  } else {
    return false;
  }
}

// 檢查它的範圍
function range(playerGuess, randomNum) {
  if (playerGuess > randomNum && playerGuess <= max) {
    max = playerGuess;
  } else if (playerGuess < randomNum && playerGuess >= min) {
    min = playerGuess;
  } else {
    alert("你不能這麼做");
    guessCount--;
    guessField.value = "";
    lowOrHi.textContent = "看清楚!," + min + "~" + max;
  }
}

// 點擊function
function guessClick() {
  if (guessCount === 1) {
    guess.textContent = "已猜的數字: ";
  }
  let playerGuess = Number(guessField.value);
  let win = checkWin(playerGuess);

  if (win) {
    lastResult.textContent = "答對了!";
    lastResult.style = "background-color: green";
    lowOrHi.textContent = "";
    gameOver();
  } else {
    range(playerGuess, randomNum);
    if (guessCount === 10) {
      lastResult.textContent = "GG思密達 下次再努力!";
      lastResult.style = "background-color: red";
      gameOver();
    } else {
      lastResult.textContent = "答錯了 繼續加油!";
      lastResult.style = "background-color: red";
      lowOrHi.textContent = "新的範圍是：" + min + "~" + max;
    }
  }

  if (playerGuess <= max && playerGuess >= min) {
    guess.textContent += playerGuess + "、";
  } else {
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// 呼叫click
guessSubmit.addEventListener("click", guessClick);

//gameOver
function gameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  restartBtn = document.createElement("button");
  restartBtn.textContent = "再玩一次";
  document.body.appendChild(restartBtn);
  restartBtn.addEventListener("click", restGame);
}

function restGame() {
  guessCount = 1;

  let resetP = document.querySelectorAll(".result p");
  for (let i = 0; i < resetP.length; i++) {
    resetP[i].textContent = "";
  }

  restartBtn.parentNode.removeChild(restartBtn);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style = "background-color: white";

  randomNum = Math.floor(Math.random() * 100) + 1;
  min = 1;
  max = 100;
}
