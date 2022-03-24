import {
  onlyNumbers,
  countTime,
  startCounting,
  stopCounting,
  validate,
  btnUnblock,
} from "./src/validation";

import { isPackageReceived, pckgNotFound, pckgFound } from "./src/searcher";

//form
const form = document.forms.pckg;
const formPhone = pckg.phone;
const formCode = pckg.code;
let found;

//buttons
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
btnSubmit.disabled = true;

//dialogs
const dialogSuccess = document.querySelector(".dialog__success");
const dialogFailed = document.querySelector(".dialog__failed");
const loader = document.querySelector(".loader");
const loadingError = document.querySelector(".loading__error");
const input = document.querySelectorAll("input");
const reload = () => window.location.reload(true);

//ekran startowy
btnStart.addEventListener("click", () => {
  form.classList.add("form");
  btnStart.hidden = true;
  startCounting();
});

//akceptuj tylko cyfry, przeładuj stronę jeśli formularz nie zostanie wypełniony
input.forEach((input) => {
  input.addEventListener("keypress", onlyNumbers, false);
  input.addEventListener("keypress", loadingErrorTimeout(80000));
});

//inputs validation and errors
validate(formPhone, formCode, btnUnblock);

//wyświetl formularz
form.addEventListener("submit", (event) => {
  event.preventDefault();
  stopCounting();

  //odpalam loader
  loader.hidden = false;

  //blokada przycisku - puste pola
  if (
    formPhone.value.trim().length === 0 ||
    formCode.value.trim().length === 0
  ) {
    return (btnSubmit.disabled = true);
  }

  //pobranie danych z API
  fetch("http://localhost:3000/packages/")
    .then((packages) => packages.json())
    .then((packages) => {
      //wyszukiwanie paczki w bazie i sprawdzenie, czy nie została już odebrana
      packages.find((pckg) => {
        if (
          pckg.phoneNumber == formPhone.value &&
          pckg.code == formCode.value &&
          pckg.isPackageReceived == false
        ) {
          return (found = pckg.id);
        }
      });

      //brak paczki o przekazanych danych
      if (found == undefined) {
        pckgNotFound(
          formPhone,
          formCode,
          btnDialogCloseTryAgain,
          dialogSuccess,
          dialogFailed,
          form
        );
      } else {
        //dane znalezione
        //paczka odebrana - koniec || odbierz kolejną
        pckgFound(
          btnSubmit,
          dialogSuccess,
          dialogFailed,
          btnDialogGoNext,
          startCounting,
          formCode,
          btnDialogFinish,
          reload
        );
      }
    })
    .catch((error) => {
      //loading error
      loadingError.hidden = false;
      //przeładuj stronę do ekranu początkowego
      loadingErrorTimeout("5000");
      return;
    })
    .finally((res) => {
      loader.hidden = true;
      isPackageReceived(found);
      found = undefined;
      return;
    });
});

//przeładuj stronę
function loadingErrorTimeout(time) {
  setTimeout(reload, time);
}

//brak aktywności użytkownika - przeładuj stronę
btnSubmit.addEventListener("visibilitychange", loadingErrorTimeout(80000));
