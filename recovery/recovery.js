import { auth } from "../shared/firebaseConfig.js";
import {
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

// translate firebase auth error codes to user messages
function translateFirebaseError(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Informe um e-mail válido.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Aguarde um pouco antes de tentar novamente.";
    default:
      return "Não foi possível enviar o código. Tente novamente.";
  }
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

  // real password reset via firebase auth
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // generic message regardless of whether the email exists to avoid leaking which emails are registered
      showMessage(
        "Se este e-mail estiver cadastrado, você receberá um código em instantes.",
        "success"
      );

      button.disabled = false;
      button.textContent = "Enviar código de recuperação";
    })
    .catch((error) => {
      // auth/user-not-found also falls here, but we still show the generic success message to avoid leaking existence
      if (error.code === "auth/user-not-found") {
        showMessage(
          "Se este e-mail estiver cadastrado, você receberá um código em instantes.",
          "success"
        );
      } else {
        showMessage(translateFirebaseError(error.code), "error");
      }

      button.disabled = false;
      button.textContent = "Enviar código de recuperação";
    });
});