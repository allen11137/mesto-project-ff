
export { clearValidation, enableValidation };

const enableValidation = (validationConfig) => {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  forms.forEach((form) => initializeFormValidation(form, validationConfig));
};

const clearValidation = (form, validationConfig) => {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);
  inputs.forEach((input) => resetInputError(form, input, validationConfig));
  updateButtonState(inputs, submitButton, validationConfig);
};

const displayInputError = (form, input, errorMessage, validationConfig) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (!errorElement) {
    console.error(`Элемент с ошибкой для ${input.id} не найден`);
    return;
  }
  input.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const resetInputError = (form, input, validationConfig) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (errorElement) {
    input.classList.remove(validationConfig.inputErrorClass);
    input.setCustomValidity("");
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  } else {
    console.error(`Элемент с ошибкой для ${input.id} не найден`);
  }
};

const validateInput = (form, input, validationConfig) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
  const minLength = input.getAttribute("minlength") || 2;
  const maxLength = input.getAttribute("maxlength") || 200;

  if (input.type === "url") {
    
    if (!validateUrl(input)) {
      input.setCustomValidity("Введите URL.");
    } else {
      input.setCustomValidity("");
    }
  } else {
   
    if (input.value.length < minLength) {
      input.setCustomValidity(`Текст должен быть не короче ${minLength} символов.`);
    } else if (input.value.length > maxLength) {
      input.setCustomValidity(`Текст должен быть не длиннее ${maxLength} символов.`);
    } else if (!pattern.test(input.value)) {
      input.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.");
    } else {
      input.setCustomValidity("");
    }
  }

  if (input.validationMessage) {
    displayInputError(form, input, input.validationMessage, validationConfig);
  } else {
    resetInputError(form, input, validationConfig);
  }
};



const initializeFormValidation = (form, validationConfig) => {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);
  updateButtonState(inputs, submitButton, validationConfig);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(form, input, validationConfig);
      updateButtonState(inputs, submitButton, validationConfig);
    });
  });
};

const containsInvalidInput = (inputs) => inputs.some((input) => !input.validity.valid);

const updateButtonState = (inputs, submitButton, validationConfig) => {
  if (containsInvalidInput(inputs)) {
    submitButton.disabled = true;
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
  }
};


