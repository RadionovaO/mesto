const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputSpanSelector: '.popup__input-error',
    saveButtonSelector: '.popup__save',
    disabledButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__input_type_error'
    
};

function disableSabmit(evt) {
    evt.preventDefault();
};

function enableValition(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    
    formList.forEach((form) => {
        form.addEventListener('submit', disableSabmit);
        form.addEventListener('input', (evt) => {
            hadleFormInput(evt, validationConfig);
            toggleButton(form, validationConfig);
        });
        toggleButton(form, validationConfig);
    });
};

const showInputError = (input, validationConfig) => {
    console.log(input);
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


function toggleButton(form, validationConfig) {
    const buttonSaveCardForm = form.querySelector(validationConfig.saveButtonSelector);
    const isFormValid = form.checkValidity();

    buttonSaveCardForm.disabled = !isFormValid;
    buttonSaveCardForm.classList.toggle('popup__save_disabled', !isFormValid);

};
enableValition(validationConfig);