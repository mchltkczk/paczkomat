
let totatTime = 0;
let counter = 0;
let timer;


function countTime() {
  counter += 10;
  totalTime = counter / 1000
}

function startCounting() {
  timer = setInterval(countTime, 10)
}

function stopCounting() {
  clearInterval(timer);
}