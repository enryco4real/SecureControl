const form = document.getElementById("recovery-form");
const emailInput = document.getElementById("email");
const button = document.getElementById("recovery-button");
const formMessage = document.getElementById("form-message");

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
}

function clearMessage() {
  formMessage.textContent = "";
  formMessage.className = "form-message";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage();

  const email = emailInput.value.trim();

  emailInput.classList.remove("invalid");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.classList.add("invalid");
    showMessage("Informe um e-mail válido.", "error");
    return;
  }

  // loading state
  button.disabled = true;
  button.textContent = "Enviando...";

  // remind: switch to actual API call when backend is available
  setTimeout(() => {
    console.log("Solicitação de recuperação para:", email);

    showMessage(
      "Se este e-mail estiver cadastrado, você receberá um código em instantes.",
      "success",
    );

    button.disabled = false;
    button.textContent = "Enviar código de recuperação";
  }, 1200);
});
