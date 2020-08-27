const body = document.querySelector("body");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");
const carrotCount = document.querySelector(".carrotCounter");
const gameBoard = document.querySelector(".gameBoard");
const icon = document.querySelector(".startBtn > i");
const restartBox = document.querySelector(".reStartBox");

let count = 0;
let bugs = 0;
let carrots = 0;
let intervalId = null;

const playSound = new Audio("./sound/bg.mp3");
const bugPull = new Audio("./sound/bug_pull.mp3");
const carrotPull = new Audio("./sound/carrot_pull.mp3");
const win = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

body.addEventListener("click", (event) => {
  let btn = event.target.className;

  if (btn === "startBtn" || btn === "fas fa-play") {
    playSound.play();

    count = getRandomNumber("count");
    bugs = getRandomNumber("bugs");
    carrots = getRandomNumber("carrots");

    createCarrots(carrots);
    createBugs(bugs);

    timer.textContent = getTimeNumber(count);
    carrotCount.textContent = carrots;

    intervalId = setInterval(() => {
      if (count <= 0) {
        alertSound.play();
        clearInterval(intervalId);
        restartBox.style.zIndex = "1";
        startBtn.style.opacity = "0";
        icon.setAttribute("class", "fas fa-play");
      } else if (carrots === 0) {
        win.play();
        clearInterval(intervalId);
        restartBox.style.zIndex = "1";
        restartBox.childNodes[3].textContent = "You Won";
        startBtn.style.opacity = "0";
      }
      timer.textContent = getTimeNumber(count);
      carrotCount.textContent = carrots;
      count--;
    }, 1000);

    startBtn.setAttribute("class", "stoptBtn");
    icon.setAttribute("class", "fas fa-stop");
  } else if (btn === "stopBtn" || btn === "fas fa-stop") {
    clearInterval(intervalId);
    startBtn.setAttribute("class", "startBtn");
    icon.setAttribute("class", "fas fa-play");
    timer.textContent = "00:00";
    carrotCount.textContent = "0";
    startBtn.style.opacity = "0";
    restartBox.style.zIndex = "1";
    restartBox.childNodes[3].textContent = "You Lost";

    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
  }
});

gameBoard.addEventListener("click", (event) => {
  if (event.target.className === "carrot") {
    carrotPull.play();
    const carrot_id = event.target.dataset.id;

    if (carrot_id) {
      const toBeDeleted = document.querySelector(
        `.carrot[data-id="${carrot_id}"]`
      );
      toBeDeleted.remove();
      carrots--;
    }
  } else if (event.target.className === "bug") {
    bugPull.play();
    startBtn.style.opacity = "0";
    restartBox.style.zIndex = "1";
    restartBox.childNodes[3].textContent = "You Lost";
    clearInterval(intervalId);
  }
});

restartBox.addEventListener("click", (event) => {
  const target = event.target.className;
  if (target === "reStartBtn" || target === "fas fa-undo-alt") {
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
    icon.setAttribute("class", "fas fa-play");
    startBtn.style.opacity = "1";
    restartBox.style.zIndex = "-1";
    carrotCount.textContent = "0";
    timer.textContent = "00:00";
  }
});

function getRandomNumber(name) {
  if (name === "count") {
    return Math.floor(Math.random() * 5) + 5;
  } else if (name === "bugs") {
    return Math.floor(Math.random() * 8) + 7;
  } else {
    return Math.floor(Math.random() * 7) + 5;
  }
}

function getTimeNumber(count) {
  if (count >= 60) {
    let divide = Math.floor(count / 60);
    let remains = count % 60;

    if (divide < 10) {
      divide = `0${divide}`;
    }
    if (remains < 10) {
      remains = `0${remains}`;
    }

    return `${divide}:${remains}`;
  } else {
    let remains = count % 60;

    if (remains < 10) {
      remains = `0${remains}`;
    }

    return `00:${remains}`;
  }
}

function createCarrots(carrots) {
  let x = 0,
    y = 0;
  for (let i = 0; i < carrots; i++) {
    x = Math.floor(Math.random() * 70 + 10);
    y = Math.floor(Math.random() * 30 + 60);

    gameBoard.innerHTML += `<div class="carrot" data-id="${i}" style="top:${y}% ; left:${x}%"></div>`;
  }
}

function createBugs(bugs) {
  let x = 0,
    y = 0;
  for (let i = 0; i < bugs; i++) {
    x = Math.floor(Math.random() * 70 + 10);
    y = Math.floor(Math.random() * 30 + 60);
    gameBoard.innerHTML += `<div class="bug" style="top:${y}% ; left:${x}%" ></div>`;
  }
}
