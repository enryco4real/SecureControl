import { auth } from "../shared/firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const userEmailEl = document.getElementById("user-email");
const logoutButton = document.getElementById("logout-button");

// route guard: only lets the page render if theres an active session
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../login/login.html";
    return;
  }

  userEmailEl.textContent = user.email;
});

// settings dropdown
const settingsButton = document.getElementById("settings-button");
const settingsMenu = document.getElementById("settings-menu");

settingsButton.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = !settingsMenu.hidden;

  settingsMenu.hidden = isOpen;
  settingsButton.setAttribute("aria-expanded", String(!isOpen));
});

// closes the menu when clicking outside of it
document.addEventListener("click", (event) => {
  if (!settingsMenu.hidden && !event.target.closest(".settings-wrapper")) {
    settingsMenu.hidden = true;
    settingsButton.setAttribute("aria-expanded", "false");
  }
});


// logout
logoutButton.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "../login/login.html";
  });
});
