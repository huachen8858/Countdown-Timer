const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");
const hrInput = document.querySelector(".hr");
const minInput = document.querySelector(".min");
const secInput = document.querySelector(".sec");
const starBtn = document.querySelector(".start-btn");
const undo = document.querySelector(".undo");

// 當一開始未設定倒數時間時，讓他呈現00:00:00的效果
semicircles[0].style.display = "none";
semicircles[1].style.display = "none";
semicircles[2].style.display = "none";

timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        `;
timer.style.color = "lightgray";

let timerLoop;
starBtn.addEventListener("click", startCountdown);
undo.addEventListener("click", undoCountdown);

// start
function startCountdown() {
  const userHr = parseInt(hrInput.value) || 0;
  const userMin = parseInt(minInput.value) || 0;
  const userSec = parseInt(secInput.value) || 0;

  // 如果輸入0
  if (userHr === 0 && userMin === 0 && userSec === 0) {
    return;
  } else {
    // disabled input if during countdown
    hrInput.disabled = true;
    minInput.disabled = true;
    secInput.disabled = true;

    semicircles[0].style.display = "block";
    semicircles[1].style.display = "block";
    semicircles[2].style.display = "block";
    timer.style.color = "#2a4e85";

    const hours = userHr * 3600000;
    const minutes = userMin * 60000;
    const seconds = userSec * 1000;
    const setTime = hours + minutes + seconds;

    // 按下開始時將值填入中間
    const initialHrs = Math.floor((setTime / (1000 * 60 * 60)) % 24);
    const initialMins = Math.floor((setTime / (1000 * 60)) % 60);
    const initialSecs = Math.floor((setTime / 1000) % 60);

    timer.innerHTML = `
      <div>${initialHrs < 10 ? '0' : ''}${initialHrs}</div>
      <div class="colon">:</div>
      <div>${initialMins < 10 ? '0' : ''}${initialMins}</div>
      <div class="colon">:</div>
      <div>${(initialSecs < 10 ? '0' : '')}${initialSecs === 0 ? initialSecs : initialSecs - 1}</div>
    `;

    // 清除input
    hrInput.value = "";
    minInput.value = "";
    secInput.value = "";

    const starTime = Date.now();
    const futureTime = starTime + setTime;

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

    timerLoop = setInterval(countDownTimer, 1000);

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
      <div>${hrs < 10 ? "0" : ""}${hrs}</div>
      <div class="colon">:</div>
      <div>${mins < 10 ? "0" : ""}${mins}</div>
      <div class="colon">:</div>
      <div>${secs < 10 ? "0" : ""}${secs}</div>
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

        hrInput.disabled = false;
        minInput.disabled = false;
        secInput.disabled = false;

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
  }
}

// undo
function undoCountdown() {
  clearInterval(timerLoop);

  hrInput.disabled = false;
  minInput.disabled = false;
  secInput.disabled = false;

  hrInput.value = "";
  minInput.value = "";
  secInput.value = "";

  semicircles[0].style.display = "none";
  semicircles[1].style.display = "none";
  semicircles[2].style.display = "none";

  timer.innerHTML = `
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
  `;
  timer.style.color = "lightgray";
}
