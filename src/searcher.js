export { isPackageReceived, pckgNotFound, pckgFound };

function isPackageReceived(id) {
  fetch(`http://localhost:3000/packages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isPackageReceived: true,
    }),
  }).then((response) => response.json());
}

function pckgNotFound(
  formPhone,
  formCode,
  btnDialogCloseTryAgain,
  dialogSuccess,
  dialogFailed,
  form
) {
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
}

function pckgFound(
  btnSubmit,
  dialogSuccess,
  dialogFailed,
  btnDialogGoNext,
  startCounting,
  formCode,
  btnDialogFinish,
  reload
) {
  dialog.open = true;
  btnSubmit.disabled = true;
  dialogSuccess.hidden = false;
  dialogFailed.hidden = true;
  //odbierz kolejną
  btnDialogGoNext.addEventListener("click", (event) => {
    startCounting();
    dialog.open = false;
    formCode.value = "";
    //to wszystko na dziś
  });
  btnDialogFinish.addEventListener("click", () => reload());
  return;
}
