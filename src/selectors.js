export {
  form,
  formPhone,
  formCode,
  found,
  btnStart,
  btnSubmit,
  btnDialogFinish,
  btnDialogGoNext,
  btnDialogCloseTryAgain,
  dialogSuccess,
  dialogFailed,
  loader,
  loadingError,
  successTime,
  input,
  spanError,
};

const form = document.forms.pckg;
const formPhone = pckg.phone;
const formCode = pckg.code;
let found;

const btnStart = document.getElementById("btn__start");
const btnSubmit = document.querySelector(".btn__submit");
const btnDialogFinish = document.querySelector(
  ".dialog__success > .dialog__finish"
);
const btnDialogGoNext = document.querySelector(
  ".dialog__success > .submit__next"
);
const btnDialogCloseTryAgain = document.querySelector(
  ".dialog__failed > button"
);

const dialogSuccess = document.querySelector(".dialog__success");
const dialogFailed = document.querySelector(".dialog__failed");
const loader = document.querySelector(".loader");
const loadingError = document.querySelector(".loading__error");
const successTime = document.querySelector("p > .success__time");
const input = document.querySelectorAll("input");
const spanError = document.querySelector(".form__error");
