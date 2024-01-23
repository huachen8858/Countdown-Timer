// Concept: angle = remainingTime(futureTime - currentTime) / setTime * 360 deg

const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");

// input
const hr = 0;
const min = 0;
const sec = 10;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;
const starTime = Date.now();
const futureTime = starTime + setTime;

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
  const currentTime = Date.now();
  const remainingTime = futureTime - currentTime;
  const angle = (remainingTime / setTime) * 360;

  // --- Progress indicator ---
  // 1.如果角度大於180 就不要顯示白色半圓，並讓紅色旋轉 180deg 藍色旋轉 angle deg
  if (angle > 180) {
    semicircles[2].style.display = "none";
    semicircles[0].style.transform = "rotate(180deg)";
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  } else {
    semicircles[2].style.display = "block";
    semicircles[0].style.transform = `rotate(${angle}deg)`;
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  }

  // --- Timer ---
  // 3.顯示時間在中間
  const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60);
  const secs = Math.floor((remainingTime / 1000) % 60);

  timer.innerHTML = `
  <div>${hrs}</div>
  <div class="colon">:</div>
  <div>${mins}</div>
  <div class="colon">:</div>
  <div>${secs}</div>
  `;

  // --- 5sec-condition ---
  // 5. 最後5秒變成紅色
  if (remainingTime <= 6000) {
    semicircles[0].style.backgroundColor = "red";
    semicircles[1].style.backgroundColor = "red";
    timer.style.color = "red";
  }

  // --- End ---
  // 2. 如果剩餘時間=0 就 clearInterval,並清除髒髒的外圈
  if (remainingTime < 0) {
    clearInterval(timerLoop);
    semicircles[0].style.display = "none";
    semicircles[1].style.display = "none";
    semicircles[2].style.display = "none";

    // 4.倒數完設為 00:00:00 顏色變灰色
    timer.innerHTML = `
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    `;
    timer.style.color = "lightgray";

  }
}
