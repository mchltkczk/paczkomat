export {
  validate,
  btnUnblock,
  inputNumbersOnly,
  onlyNumbers,
  countTime,
  startCounting,
  stopCounting,
};

const form = document.forms.pckg;
const formPhone = pckg.phone;
const formCode = pckg.code;
const btnSubmit = document.querySelector(".btn__submit");

function btnUnblock(formPhone, formCode) {
  if (
    formPhone.classList.contains("error") ||
    formCode.classList.contains("error")
  ) {
    return (btnSubmit.disabled = true);
  } else {
    return (btnSubmit.disabled = false);
  }
}

function validate(formPhone, formCode, btnUnblock) {
  formCode.addEventListener("input", () => {
    if (formCode.value.trim().length < 4) {
      formCode.classList.add("error");
    } else {
      formCode.classList.remove("error");
      formCode.classList.remove("error__red");
    }
    btnUnblock(formPhone, formCode);
  });

  formCode.addEventListener("blur", () => {
    if (formCode.value.trim().length < 4) {
      formCode.classList.add("error");
      formCode.classList.add("error__red");
    } else {
      formCode.classList.remove("error");
      formCode.classList.remove("error__red");
    }
    btnUnblock(formPhone, formCode);
  });

  formPhone.addEventListener("input", () => {
    if (formPhone.value.trim().length < 9) {
      formPhone.classList.add("error");
    } else {
      formPhone.classList.remove("error");
      formPhone.classList.remove("error__red");
    }
    btnUnblock(formPhone, formCode);
  });

  formPhone.addEventListener("blur", () => {
    if (formPhone.value.trim().length < 9) {
      formPhone.classList.add("error");
      formPhone.classList.add("error__red");
    } else {
      formPhone.classList.remove("error");
      formPhone.classList.remove("error__red");
    }
    btnUnblock(formPhone, formCode);
  });
}

function inputNumbersOnly(onlyNumbers) {
  input.forEach((input) => {
    input.addEventListener("keypress", onlyNumbers, false);
  });
}

function onlyNumbers(event) {
  let charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
    console.log("Tylko cyfry");
  }
}

function onlyNumbers(event) {
  let charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
    console.log("Tylko cyfry");
  }
}

function countTime() {
  counter += 10;
  totalTime = counter / 1000;
  return;
}

function startCounting() {
  return (timer = setInterval(countTime, 10));
}

function stopCounting() {
  clearInterval(timer);
  totalTime = totalTime.toString();
  successTime.innerText = totalTime;
  counter = 0;
  totalTime = 0;
}

let totalTime = 0;
let counter = 0;
let timer;
const successTime = document.querySelector("p > .success__time");
