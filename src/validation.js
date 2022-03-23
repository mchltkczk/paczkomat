export default function validate() {
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