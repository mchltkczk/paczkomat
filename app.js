const form = document.forms.package;
const formPhone = package.phone;
const formCode = package.code;

// btnStart = document.getElementById('btn__start')
const btnSubmit = document.querySelector(".btn__submit");
const btnDialogFinish = document.querySelector(
  "dialog__success > .dialog__finish"
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
//ekran startowy
// btnStart.addEventListener('click', (event) => {
//   event.preventDefault();
//   form.hidden = false;
//   btnStart.hidden = true;
// })

valiDate();
function valiDate() {
  formCode.addEventListener("input", () => {
    console.log(formCode.value.length);
    if (formCode.value.trim().length < 4) {
      formCode.classList.add("error");
    } else {
      formCode.classList.remove("error");
      formCode.classList.remove("error__red");
    }
    btnUnblock();
  });

  formCode.addEventListener("blur", () => {
    console.log(formCode.value.length);
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
    console.log(formPhone.value.length);
    if (formPhone.value.trim().length < 9) {
      formPhone.classList.add("error");
    } else {
      formPhone.classList.remove("error");
      formPhone.classList.remove("error__red");
    }
    btnUnblock();
  });

  formPhone.addEventListener("blur", () => {
    console.log(formPhone.value.length);
    if (formPhone.value.trim().length < 9) {
      formPhone.classList.add("error");
      formPhone.classList.add("error__red");
    } else {
      formPhone.classList.remove("error");
      formPhone.classList.remove("error__red");
    }
    btnUnblock();
  });

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
}
//wyświetl formularz

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loader.hidden = false;
  if (
    formPhone.value.trim().length === 0 ||
    formCode.value.trim().length === 0
  ) {
    return (btnSubmit.disabled = true);
  }

  console.log("submit");

  fetch("http://localhost:3000/packages")
    .then((res) => res.json())
    .then((res) => {
      console.log("click");
      //wyszukiwanie danych w bazie
      res.forEach((package) => {
        if (
          package.phoneNumber == formPhone.value &&
          package.code == formCode.value
        ) return res = true;
      });
        
      if (res == true)
          {
          //dane znalezione
          console.log("sukces");
          //paczka odebrana - koniec || odbierz kolejną
          dialog.open = true;

          btnSubmit.disabled = true;
          dialogSuccess.hidden = false;
          dialogFailed.hidden = true;

          btnDialogGoNext.addEventListener("click", () => {
            console.log("click");
            dialog.open = false;
            formCode.value = "";
          });
          //odbierz kolejną
          // btnSubmit.disabled = true;
          //koniec na dziś
        } else {
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
        }
      
    })
    .catch((error) => {
      //loading error
      loadingError.hidden = false;
    })
    .finally((res) => {
      loader.hidden = true;
      // loading.hidden = true;
      //close modal when click 'X'
    });
});


fetch("http://localhost:3000/packages", {
  method: "PATCH",
})
.then((res) => {
  console.log(res);

  if (res.ok) {
    return res.json();
    } else {
      return Promise.reject();
    }
})
  .then(() => {
    console.log('Paczka usunięta')
  })
  .catch(() => {
    console.log('błąd');
  })


  //     "packages": [
  //         {
  //     "id": 1,
  //     "phoneNumber": "505129940",
  //     "code": "1234",
  //     "isPackageReceived": false
  //         }
  //     ]
  // }

  
//sprawdzanie poprawności danych w polu formularzy
// formPhone.addEventListener("input", () => {
//   if (formPhone.value.length == 3) {
//     formPhone.value += " ";
//   }
//   if (formPhone.value.length == 7) {
//     formPhone.value += " ";
//   }
// });

// // const btnSubmit = document.querySelector(".button__submit");
// // const btnSubmitNext = document.querySelector(".submit__next");
// const btnFinish = document.querySelector(".dialog__finish");
// const dialog = document.querySelector('.dial');
// const packageForm = document.forms.package;
// // const packageFormCode = packageForm.code;
// // const packageFormPhone = packageForm.phone__number;
// let dialogTrigger = true;
// const wrapper = document.querySelector('.wrapper');
// const btnStart = document.getElementById("btn__start");

// function createForm() {
//   const packageForm = document.createElement('form')
//   packageForm.setAttribute('name','package');
//   const packageFormPhone = document.createElement('input');
//   packageFormPhone.setAttribute('name', 'phone__number');
//   const packageFormCode = document.createElement('input');
//   packageFormCode.setAttribute('name', 'code');
//   btnSubmit = document.createElement('button');
//   btnSubmit.setAttribute('id','btn__submit');
//   btnSubmit.innerText = 'Odbierz paczkę submit'
//   wrapper.append(packageForm)
//   packageForm.append(packageFormPhone, packageFormCode, btnSubmit);
//   }

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
