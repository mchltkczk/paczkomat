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
btnSubmit.disabled = true;
const dialogSuccess = document.querySelector(".dialog__success");
const dialogFailed = document.querySelector(".dialog__failed");
const loader = document.querySelector(".loader");
const loadingError = document.querySelector(".loading__error");
const successTime = document.querySelector("p > .success__time");
const input = document.querySelectorAll('input');
const spanError = document.querySelector('.form__error')
const reload = () => window.location.reload(true)

function loadingErrorTimeout() {
  setTimeout(reload, 5000)
}

//akceptuj tylko cyfry
input.forEach(input => {
  input.addEventListener('keypress', onlyNumbers, false)
})

function onlyNumbers(event) {
  let charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      console.log("Tylko cyfry");
    }
}

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

//ekran startowy
btnStart.addEventListener("click", () => {
  form.classList.add('form')
  btnStart.hidden = true;
  startCounting();
});

validate();
function validate() {
  formCode.addEventListener("input", () => {
    if (formCode.value.trim().length < 4) {
      formCode.classList.add("error");
    } else {
      formCode.classList.remove("error");
      formCode.classList.remove("error__red");
    }
    btnUnblock();
  });

  formCode.addEventListener("blur", () => {
    if (formCode.value.trim().length < 4) {
      formCode.classList.add("error");
      formCode.classList.add("error__red");
    } else {
      formCode.classList.remove("error");
      formCode.classList.remove("error__red");
    }
    btnUnblock();
  });

  formPhone.addEventListener("input", () => {
    if (formPhone.value.trim().length < 9) {
      formPhone.classList.add("error");
    } else {
      formPhone.classList.remove("error");
      formPhone.classList.remove("error__red");
    }
    btnUnblock();
  });

  formPhone.addEventListener("blur", () => {
    if (formPhone.value.trim().length < 9) {
      formPhone.classList.add("error");
      formPhone.classList.add("error__red");
    } else {
      formPhone.classList.remove("error");
      formPhone.classList.remove("error__red");
    }
    btnUnblock();
  });
}
  function btnUnblock() {
    if (
      formPhone.classList.contains("error") ||
      formCode.classList.contains("error")
    ) {
      return (btnSubmit.disabled = true);
    } else {
      return (btnSubmit.disabled = false);
    }
  }

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
          return found = pckg.id;
        }
      });
      //brak paczki o przekazanych danych
      if (found == undefined) {
        dialog.open = true;
        dialogSuccess.hidden = true;
        dialogFailed.hidden = false;
        //spróbuj ponownie + zdjęcie błędów z inputów
        btnDialogCloseTryAgain.addEventListener("click", () => {
        dialog.open = false;
        formPhone.classList.remove("error__red");
        formCode.classList.remove("error__red");
        form.reset();
        });
        return;
      } else {
        //dane znalezione
        //paczka odebrana - koniec || odbierz kolejną
        dialog.open = true;
        btnSubmit.disabled = true;
        dialogSuccess.hidden = false;
        dialogFailed.hidden = true;
        //odbierz kolejną
        btnDialogGoNext.addEventListener("click", (event) => {
          startCounting();
          event.preventDefault();
          dialog.open = false;
          formCode.value = "";
        //to wszystko na dziś
       
        });
        btnDialogFinish.addEventListener("click", () => reload())
        return
      }
    })
    // .then((found) => {
    //   return isPackageReceived(found);
    // })
    .catch((error) => {
      //loading error
      loadingError.hidden = false;
      loadingErrorTimeout()      
      return
    })
    .finally((res) => {
      loader.hidden = true;
      isPackageReceived(found);
      found = undefined;
      return
      
      // loading.hidden = true;
      //close modal when click 'X'
    });
});

function findPackage() {
  packages.find((pckg) => {
    if (
      pckg.phoneNumber == formPhone.value &&
      pckg.code == formCode.value
    ) {
      found = pckg.id;
    }
    return found;
  });
  return found;
}

function isPackageReceived(id) {
  fetch(`http://localhost:3000/packages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isPackageReceived: true,
    }),
  })
    .then((response) => response.json())
    // .then((json) => console.log(json));
}

function searchForPackage(found, isPackageReceived) {
  if (found == undefined) {
    //brak paczki na wpisane dane
    dialog.open = true;
    dialogSuccess.hidden = true;
    dialogFailed.hidden = false;
    btnDialogCloseTryAgain.addEventListener("click", () => {
      dialog.open = false;
      formPhone.classList.remove("error__red");
      formCode.classList.remove("error__red");
    });

    form.reset();
    console.log("Brak paczki dla wpisanych danych...");
    return;
  } else {
    console.log(found);
    //dane znalezione
    console.log("sukces");
    //paczka odebrana - koniec || odbierz kolejną
    dialog.open = true;
    btnSubmit.disabled = true;
    dialogSuccess.hidden = false;
    dialogFailed.hidden = true;
    return;
  }
}

//sprawdzanie poprawności danych w polu formularzy
// formPhone.addEventListener("input", () => {
//   if (formPhone.value.length == 3) {
//     formPhone.value += " ";
//   }
//   if (formPhone.value.length == 7) {
//     formPhone.value += " ";
//   }
// });

//ekran startowy
// btnStart.addEventListener("click", () => {
//   createForm();

// btnSubmit.addEventListener("submit", (event) => {
//   event.preventDefault();

//   loading.hidden = false; - dodać animację ładowania danych
//dostan sie do bazy
//   fetch("http://localhost:3000/packages")
//     .then((res) => res.json())
//     .then((res) => {
//       console.log("click");
//       //wyszukiwanie danych w bazie
//       res.forEach((package) => {
//         console.log(package.phoneNumber);
//         if (
//           package.phoneNumber == packageFormPhone.value &&
//           package.code == packageFormCode.value
//         ) {
//           //dane znalezione
//           console.log("sukces");
//           //paczka odebrana - koniec || odbierz kolejną
//           //odbierz kolejną

//           //koniec na dziś
//           packageFormCode.hidden = true;
//           packageFormPhone.hidden = true;
//           dialogTrigger = true;
//           dialog.open = true;

//         } else {
//           //brak paczki na wpisane dane
//           console.log("Brak paczki dla wpisanych danych...");
//         }

//       });

//     })
//     .catch((error) => {
//       //loading error
//     })
//     .finally((res) => {
//       // loading.hidden = true;
//     }

//     )});

// });

// // packageForm.onsubmit = () => {
// //   dialog.open = true;
// // }

// function onSubmit(event) {
//   event.PreventDefault
//   return dialog.open = true;
// }
// //sprawdzanie poprawności danych w polu formularzy
// packageFormPhone.addEventListener("input", () => {
//   if (packageFormPhone.value.length == 3) {
//     packageFormPhone.value += " ";
//   }
//   if (packageFormPhone.value.length == 7) {
//     packageFormPhone.value += " ";
//   }
// });

// packageFormCode.addEventListener("input", () => {});

// function validatePhone() {}

// function validateCode() {}
