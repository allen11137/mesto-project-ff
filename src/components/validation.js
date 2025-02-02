const isInputInvalid = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};

const updateButtonState = (inputs, button, config) => {
  if (isInputInvalid(inputs)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
};

const displayInputError = (form, input, errorText, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = errorText;
  error.classList.add(config.errorClass);
};

const resetInputError = (form, input, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = "";
};

const validateInput = (form, input, config) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    displayInputError(form, input, input.validationMessage, config);
  } else {
    resetInputError(form, input, config);
  }
};

const setupFormValidation = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  updateButtonState(inputs, button, config);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(form, input, config);
      updateButtonState(inputs, button, config);
    });
  });
};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setupFormValidation(form, config);
  });
};

function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    error.textContent = "";
    error.classList.remove(config.errorClass);
  });

  const button = form.querySelector(config.submitButtonSelector);
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

export { enableValidation, clearValidation };