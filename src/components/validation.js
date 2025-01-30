export { clearValidation, enableValidation};

export const validationConfig  = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__error_visible",
};

const enableValidation = (validationConfig ) => {
	const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
	forms.forEach((form) => initializeFormValidation(form, validationConfig ));
};

const clearValidation = (form, validationConfig ) => {
	const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
	const submitButton = form.querySelector(validationConfig.submitButtonSelector);
	inputs.forEach((input) => resetInputError(form, input, validationConfig ));
	updateButtonState(inputs, submitButton, validationConfig );
};

const displayInputError = (form, input, errorMessage, validationConfig ) => {
	const errorElement = form.querySelector(`.${input.id}-error`);
	input.classList.add(validationConfig .inputErrorClass);
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


const validateInput = (form, input, validationConfig ) => {
	input.validity.valid
		? resetInputError(form, input, validationConfig )
		: displayInputError(form, input, input.validationMessage, validationConfig );
};

const initializeFormValidation = (form, validationConfig ) => {
	const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
	const submitButton = form.querySelector(validationConfig.submitButtonSelector);
	updateButtonState(inputs, submitButton, validationConfig );
	inputs.forEach((input) => {
		input.addEventListener("input", () => {
			validateInput(form, input, validationConfig );
			updateButtonState(inputs, submitButton, validationConfig );
		});
	});
};

const containsInvalidInput = (inputs) => inputs.some((input) => !input.validity.valid);

const updateButtonState = (inputs, submitButton, validationConfig ) => {
	containsInvalidInput(inputs)
		? (submitButton.disabled = true, submitButton.classList.add(validationConfig.inactiveButtonClass))
		: (submitButton.disabled = false, submitButton.classList.remove(validationConfig.inactiveButtonClass));
};
