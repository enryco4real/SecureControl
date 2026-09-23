import { auth } from "../shared/firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const EYE_OPEN = `<path d="M2.06 12.35a1 1 0 0 1 0-.7C3.48 7.94 7.47 5 12 5c4.53 0 8.52 2.94 9.94 6.65a1 1 0 0 1 0 .7C20.52 16.06 16.53 19 12 19c-4.53 0-8.52-2.94-9.94-6.65Z"/><circle cx="12" cy="12" r="3"/>`;

const EYE_OFF = `<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c4.53 0 8.52 2.94 9.94 6.65a1 1 0 0 1 0 .7 11.8 11.8 0 0 1-2.17 3.4"/><path d="M6.61 6.61A11.9 11.9 0 0 0 2.06 11.65a1 1 0 0 0 0 .7C3.48 16.06 7.47 19 12 19a10.6 10.6 0 0 0 5.39-1.39"/><path d="m2 2 20 20"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>`;

// hide / show password
const toggleButton = document.getElementById("toggle-password");
const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eye-icon");

toggleButton.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";

  passwordInput.type = isHidden ? "text" : "password";
  eyeIcon.innerHTML = isHidden ? EYE_OFF : EYE_OPEN;
  toggleButton.setAttribute(
    "aria-label",
    isHidden ? "Ocultar senha" : "Mostrar senha",
  );
});

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const rememberCheckbox = document.getElementById("remember");
const loginButton = document.querySelector(".login-button");

function showError(message) {
  let messageEl = document.getElementById("form-message");

  if (!messageEl) {
    messageEl = document.createElement("span");
    messageEl.id = "form-message";
    form.insertBefore(messageEl, loginButton);
  }

  messageEl.textContent = message;
  messageEl.className = "form-message error";
}

function clearError() {
  const messageEl = document.getElementById("form-message");
  if (messageEl) messageEl.className = "form-message";
}

// translate firebase auth error codes to user messages
function translateFirebaseError(code) {
  switch (code) {
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/user-disabled":
      return "Esta conta foi desativada.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou senha incorretos.";
    default:
      return "Não foi possível entrar. Tente novamente.";
  }
}

// real login via firebase auth
form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const rememberMe = rememberCheckbox.checked;

  loginButton.disabled = true;
  loginButton.textContent = "Entrando...";

  // remember me controls how long the session persists
  // if is checked, survives closing the browser but if is unchecked it ends when the tab or browser is closed
  const persistence = rememberMe
    ? browserLocalPersistence
    : browserSessionPersistence;

  setPersistence(auth, persistence)
    .then(() => signInWithEmailAndPassword(auth, email, password))
    .then(() => {
      window.location.href = "../dashboard/dashboard.html";
    })
    .catch((error) => {
      showError(translateFirebaseError(error.code));
      loginButton.disabled = false;
      loginButton.textContent = "Entrar na central";
    });
});