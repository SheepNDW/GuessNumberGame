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

// checkWin (計數器 大or小 猜對or繼續 顯示已猜數字)
function checkWin() {
  let playerGuess = Number(guessField.value);

  if (guessCount === 1) {
    guess.textContent = "已猜的數字: ";
  }

  if (playerGuess === randomNum) {
    lastResult.textContent = "答對了!";
    lastResult.style = "background-color: green";
    lowOrHi.textContent = "";
    gameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "GG思密達 下次再努力!";
    lastResult.style = "background-color: red";
    gameOver();
  } else {
    lastResult.textContent = "答錯了 繼續加油!";
    lastResult.style = "background-color: red";
  }
  // 新增範圍提醒&違規警示
  if (playerGuess > randomNum) {
    if (playerGuess <= max) {
      max = playerGuess;
      lowOrHi.textContent = "太大了," + min + "~" + max;
    } else {
      alert("你不能這麼做");
      guessCount--;
      guessField.value = "";
      lowOrHi.textContent = "看清楚!," + min + "~" + max;
    }
  } else if (playerGuess < randomNum) {
    if (playerGuess >= min) {
      min = playerGuess;
      lowOrHi.textContent = "猜小了," + min + "~" + max;
    } else {
      alert("你不能這麼做");
      guessCount--;
      guessField.value = "";
      lowOrHi.textContent = "看清楚!," + min + "~" + max;
    }
  }
  // 只讓符合條件的數字顯示
  if (playerGuess <= max && playerGuess >= min) {
    guess.textContent += playerGuess + "、";
  } else {
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// click
guessSubmit.addEventListener("click", checkWin);

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
