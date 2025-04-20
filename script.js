document.getElementById("startBtn").addEventListener("click", startGame);

document.getElementById("playAgainBtnWin").addEventListener("click", function() {
  document.getElementById("winModal").style.display = "none";
  resetGame();
  startGame(); 
});
document.getElementById("closeBtnWin").addEventListener("click", function() {
  document.getElementById("winModal").style.display = "none";
});

document.getElementById("playAgainBtnLose").addEventListener("click", function() {
  document.getElementById("loseModal").style.display = "none";
  resetGame();
  startGame();  
});
document.getElementById("closeBtnLose").addEventListener("click", function() {
  document.getElementById("loseModal").style.display = "none";
});

document.getElementById("addMoneyBtn").addEventListener("click", function() {
  totalMoney += 100; 
  totalMoney = parseFloat(totalMoney.toFixed(2)); 
  document.getElementById("totalMoney").innerText = "Total Money: " + totalMoney;
  document.getElementById("emptyMoneyModal").style.display = "none";
});

let angle = 0;            
let speed = 0;            
let deceleration = 0.05;  
let spinning = false;    
let totalMoney = 100;     

const ballContainer = document.getElementById("ballContainer");

const pockets = [
  0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24,
  36, 13, 1, "00", 27, 10, 25, 29, 12, 8, 19, 31, 18, 6,
  21, 33, 16, 4, 23, 35, 14, 2
];

const pocketCount = pockets.length; 
const segmentAngle = 360 / pocketCount;  

const offsetAngle = 180 + segmentAngle / 2;

/**
 * 根据当前角度返回对应的轮盘数字
 * @param {number} angle - 当前旋转角度
 * @returns 返回对应的口袋数字（可能是数字或"00"）
 */
function getPocketByAngle(angle) {
  angle = ((angle % 360) + 360) % 360;
  let adjustedAngle = angle + offsetAngle;
  adjustedAngle = ((adjustedAngle % 360) + 360) % 360;
  const index = Math.floor(adjustedAngle / segmentAngle);
  return pockets[index];
}

function startGame() {
  if (totalMoney === 0) {
    document.getElementById("emptyMoneyModal").style.display = "flex";
    return;
  }
  const guessInput = document.getElementById("guessNumber").value.trim();
  const betInput = document.getElementById("betAmount").value.trim();
  
  if (guessInput.indexOf('.') !== -1) {
    alert("choosing number: please choose a valid integer");
    return;
  }
  
  if (!/^\d+(\.\d{1,2})?$/.test(betInput)) {
    alert("please enter a valid bet amount (up to two decimal places)");
    return;
  }
  
  if (guessInput === "" || (guessInput !== "00" && (isNaN(parseInt(guessInput, 10)) || parseInt(guessInput, 10) < 1 || parseInt(guessInput, 10) > 36))) {
    alert("Please make sure the number is in range of 1 to 36");
    return;
  }
  
  const bet = parseFloat(betInput);
  if (isNaN(bet) || bet <= 0) {
    alert("Please enter a valid bet amount.");
    return;
  }
  if (bet > totalMoney) {
    alert("Bet amount cannot exceed current total amount of money.");
    return;
  }
  if (spinning) return;

  speed = 10 + Math.random() * 10;
  spinning = true;
  requestAnimationFrame(spin);
}

function spin() {
  if (!spinning) return;

  angle += speed;
  speed -= deceleration;

  if (speed <= 0) {
    speed = 0;
    spinning = false;
    angle = angle % 360;
    checkResult();
  }
  
  ballContainer.style.transform = `rotate(${angle}deg)`;
  requestAnimationFrame(spin);
}


function checkResult() {
  const finalPocket = getPocketByAngle(angle);
  const guessInput = document.getElementById("guessNumber").value;
  const bet = parseFloat(document.getElementById("betAmount").value);
  
  let guess = (guessInput === "00") ? "00" : parseInt(guessInput, 10);
  
  if (finalPocket === guess) {
    totalMoney += bet * 36;
    totalMoney = parseFloat(totalMoney.toFixed(2));
    document.getElementById("resultTextWin").innerText = "Result Number: " + finalPocket;
    showWinModal();
  } else {
    totalMoney -= bet;
    totalMoney = parseFloat(totalMoney.toFixed(2));
    document.getElementById("resultTextLose").innerText = "Result Number: " + finalPocket;
    showLoseModal();
  }
  document.getElementById("totalMoney").innerText = "Total Money: " + totalMoney;
}

function showWinModal() {
  document.getElementById("winModal").style.display = "flex";
}

function showLoseModal() {
  document.getElementById("loseModal").style.display = "flex";
}

function resetGame() {
  angle = 0;
  ballContainer.style.transform = `rotate(0deg)`;
}
