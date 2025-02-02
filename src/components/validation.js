
const validateUrl = (form, input, validationConfig) => {
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  let errorMessage = "";

  console.log("URL input value:", input.value); 

  if (input.value.trim() !== "" && !urlPattern.test(input.value.trim())) {
    errorMessage = "Введите корректный URL.";
    console.log("URL validation failed for:", input.value); 
  }

  input.setCustomValidity(errorMessage); 

  if (errorMessage) {
    displayInputError(form, input, errorMessage, validationConfig);
  } else {
    resetInputError(form, input, validationConfig);
  }
};

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
  if (input.type === "url" || input.classList.contains("url-input")) {
    validateUrl(form, input, validationConfig); // Вызов validateUrl
  } else {
    const pattern = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
    const minLength = parseInt(input.getAttribute("minlength")) || 2;
    const maxLength = parseInt(input.getAttribute("maxlength")) || 200;

    let errorMessage = "";

    console.log("Input value:", input.value); 

    if (input.value.length < minLength) {
      errorMessage = `Текст должен быть не короче ${minLength} символов.`;
    } else if (input.value.length > maxLength) {
      errorMessage = `Текст должен быть не длиннее ${maxLength} символов.`;
    } else if (input.value.trim() !== "" && !pattern.test(input.value.trim())) {
      errorMessage = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.";
      console.log("Pattern validation failed for:", input.value); 
    }

    input.setCustomValidity(errorMessage); 
   

    if (errorMessage) {
      displayInputError(form, input, errorMessage, validationConfig);
    } else {
      resetInputError(form, input, validationConfig);
    }
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

export { clearValidation, enableValidation};
