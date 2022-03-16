const form = document.forms.package;
const formPhone = package.phone;
const formCode = package.code;
let found;

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

  fetch("http://localhost:3000/packages/")
    .then((packages) => packages.json())
    .then((packages) => {
      console.log("click");
      //wyszukiwanie danych w bazie
      packages.find((package) => {
        if (
          package.phoneNumber == formPhone.value &&
          package.code == formCode.value &&
          package.isPackageReceived == false
        ) {
          found = package.id
        }}
        
        )
        console.log(package.id)
        if (found == undefined)
        {
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
         return 
       } 
       else
       {
         console.log(found)
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
         isPackageReceived(found)
   
       });
       console.log(found)
   
       
       return 
     }  
    })
    .catch((error) => {
      //loading error
      loadingError.hidden = false;
    })
    .finally((res) => {
      loader.hidden = true;
      console.log(found)

      // loading.hidden = true;
      //close modal when click 'X'
    });
});

function findPackage(){
  packages.find((package) => {
    if (
      package.phoneNumber == formPhone.value &&
      package.code == formCode.value
    ) {
      found = package.id
    }}
    
    )
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
  .then((json) => console.log(json));

}

function searchForPackage(found, isPackageReceived) {

    if (found == undefined)
     {
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
      return
    } 
    else
    {
      console.log(found)
    //dane znalezione
    console.log("sukces");
    //paczka odebrana - koniec || odbierz kolejną
    dialog.open = true;
    btnSubmit.disabled = true;
    dialogSuccess.hidden = false;
    dialogFailed.hidden = true;

    console.log(found)

    
    return 
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
