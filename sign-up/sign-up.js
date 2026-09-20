const typeCards = document.querySelectorAll(".type-card");
const conditionalBlocks = document.querySelectorAll(".conditional-fields");
const accountTypeInput = document.getElementById("account-type");
const emailLabel = document.getElementById("email-label");
const emailInput = document.getElementById("email");

const EMAIL_TEXT = {
  business: {
    label: "E-mail corporativo",
    placeholder: "seu.email@empresa.com",
  },
  residential: {
    label: "E-mail",
    placeholder: "seu.email@gmail.com",
  },
};

typeCards.forEach((card) => {
  card.addEventListener("click", () => {
    const type = card.dataset.type;

    typeCards.forEach((c) => {
      c.classList.toggle("active", c === card);
      c.querySelector("input").checked = c === card;
    });

    conditionalBlocks.forEach((block) => {
      const isMatch = block.dataset.for === type;
      block.hidden = !isMatch;

      // turn on/off required if block being visible
      block.querySelectorAll("input").forEach((input) => {
        input.required = isMatch;
      });
    });

    accountTypeInput.value = type;

    // swap email label/placeholder between corporate and personal
    const text = EMAIL_TEXT[type];
    emailLabel.textContent = text.label;
    emailInput.placeholder = text.placeholder;
  });
});

const form = document.getElementById("signup-form");
const password = document.getElementById("password");
const strengthFill = document.getElementById("strength-fill");
const strengthText = document.getElementById("strength-text");

const EYE_OPEN = `<path d="M2.06 12.35a1 1 0 0 1 0-.7C3.48 7.94 7.47 5 12 5c4.53 0 8.52 2.94 9.94 6.65a1 1 0 0 1 0 .7C20.52 16.06 16.53 19 12 19c-4.53 0-8.52-2.94-9.94-6.65Z"/><circle cx="12" cy="12" r="3"/>`;

const EYE_OFF = `<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c4.53 0 8.52 2.94 9.94 6.65a1 1 0 0 1 0 .7 11.8 11.8 0 0 1-2.17 3.4"/><path d="M6.61 6.61A11.9 11.9 0 0 0 2.06 11.65a1 1 0 0 0 0 .7C3.48 16.06 7.47 19 12 19a10.6 10.6 0 0 0 5.39-1.39"/><path d="m2 2 20 20"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>`;

// hide / show password
document.querySelectorAll(".toggle-password").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    const icon = button.querySelector("svg");
    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";
    icon.innerHTML = isHidden ? EYE_OFF : EYE_OPEN;
    button.setAttribute(
      "aria-label",
      isHidden ? "Ocultar senha" : "Mostrar senha"
    );
  });
});

// password strength
function getStrength(value) {
  let score = 0;

  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  return score;
}

const LEVELS = [
  { width: "0%", color: "#e2e8f0", text: "Força da senha" },
  { width: "25%", color: "#dc2626", text: "Muito fraca" },
  { width: "50%", color: "#f59e0b", text: "Fraca" },
  { width: "75%", color: "#eab308", text: "Boa" },
  { width: "100%", color: "#16a34a", text: "Forte" },
];

password.addEventListener("input", () => {
  const level = LEVELS[password.value ? getStrength(password.value) : 0];

  strengthFill.style.width = level.width;
  strengthFill.style.backgroundColor = level.color;
  strengthText.textContent = level.text;
});

// db validation on future
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    firstName: document.getElementById("first-name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    email: emailInput.value.trim(),
    accountType: accountTypeInput.value,
    company: document.getElementById("company")?.value.trim() || null,
    cnpj: document.getElementById("cnpj")?.value.trim() || null,
    address:
      accountTypeInput.value === "residential"
        ? {
            cep: document.getElementById("cep").value.trim(),
            number: document.getElementById("number").value.trim(),
            street: document.getElementById("street").value.trim(),
            neighborhood: document.getElementById("neighborhood").value.trim(),
            city: document.getElementById("city").value.trim(),
          }
        : null,
    password: password.value,
    confirmPassword: document.getElementById("confirm-password").value,
  };

  console.log("Dados do cadastro:", data);
});