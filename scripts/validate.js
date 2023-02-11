const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputSpanSelector: '.popup__input-error',
    saveButtonSelector: '.popup__save',
    disabledButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__input_type_error'

};

function disableSubmit(evt) {
    evt.preventDefault();
};

function enableValidation(validationConfig) { 
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((form) => {
        const buttonSubmit = form.querySelector(validationConfig.saveButtonSelector);
        form.addEventListener('submit', disableSubmit);
        form.addEventListener('input', (evt) => {
            hadleFormInput(evt, validationConfig);
            toggleButton(form, validationConfig, buttonSubmit);
        });
        toggleButton(form, validationConfig, buttonSubmit);
    });
};

const showInputError = (input, validationConfig) => {
    const inputId = input.id;
    const errorInput = document.querySelector(`#${inputId}-error`);
    input.classList.add(validationConfig.errorClass)
    errorInput.classList.add(validationConfig.inputErrorClass);
    errorInput.textContent = input.validationMessage;
};

const hideInputError = (input, validationConfig) => {
    const inputId = input.id;
    const errorInput = document.querySelector(`#${inputId}-error`);
    input.classList.remove(validationConfig.errorClass)
    errorInput.classList.remove(validationConfig.inputErrorClass);
    errorInput.textContent = '';

};

function hadleFormInput(evt, validationConfig) {
    const input = evt.target;

    if (input.validity.valid) {
        hideInputError(input, validationConfig);
    } else {
        showInputError(input, validationConfig);
    };
};


function toggleButton(form, validationConfig, buttonSubmit) {
    
    const isFormValid = form.checkValidity();
    
 buttonSubmit.disabled = !isFormValid;
 buttonSubmit.classList.toggle(validationConfig.disabledButtonClass, !isFormValid);

};
enableValidation(validationConfig);