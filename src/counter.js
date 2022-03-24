let totalTime = 0;
let counter = 0;
let timer;

function countTime() {
  counter += 10;
  totalTime = counter / 1000;
  return
}

function startCounting() {
  return timer = setInterval(countTime, 10);
}

function stopCounting() {
  clearInterval(timer);
  totalTime = totalTime.toString();
  successTime.innerText = totalTime;
  counter = 0;
  totalTime = 0;
}

const successTime = document.querySelector("p > .success__time");


export { countTime, startCounting, stopCounting, totalTime, counter, timer }