const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");
const eyeIcon = document.getElementById("eye-icon");

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.setAttribute("aria-label", "Ocultar senha");

        eyeIcon.innerHTML = `
            <path d="M3 3l18 18"/>
            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83"/>
            <path d="M9.88 4.24A9.77 9.77 0 0 1 12 4c4.52 0 8.51 2.94 9.93 6.65a1 1 0 0 1 0 .7 10.02 10.02 0 0 1-4.11 4.87"/>
            <path d="M6.61 6.61A10.02 10.02 0 0 0 2.07 11.3a1 1 0 0 0 0 .7C3.49 15.71 7.48 18.65 12 18.65a9.77 9.77 0 0 0 2.12-.24"/>
        `;
    
    } else {

        passwordInput.type = "password";

        togglePassword.setAttribute("aria-label", "Mostrar senha");

        eyeIcon.innerHTML = `
            <path d="M2.06 12.35a1 1 0 0 1 0-.7C3.48 7.94 7.47 5 12 5c4.53 0 8.52 2.94 9.94 6.65a1 1 0 0 1 0 .7C20.52 16.06 16.53 19 12 19c-4.53 0-8.52-2.94-9.94-6.65Z"/>
            <circle cx="12" cy="12" r="3"/>
        `;
    }
});