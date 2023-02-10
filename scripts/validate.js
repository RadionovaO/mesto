const formValidation = {
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

function enableValition(formValidation) {
    const formList = Array.from(document.querySelectorAll(formValidation.formSelector));
    
    formList.forEach((form) => {
        form.addEventListener('submit', disableSabmit);
        form.addEventListener('input', () => {
            toggleButton(form, formValidation);
        });
        addInputListeners(form, formValidation);
        toggleButton(form, formValidation);
    });
};

function hadleFormInput(evt, formValidation) {
    const input = evt.target; 
    const inputId = input.id;
    const errorInput = document.querySelector(`#${inputId}-error`);

    if (input.validity.valid) {
        input.classList.remove(formValidation.errorClass)
        errorInput.classList.remove(formValidation.inputErrorClass);
        errorInput.textContent = '';
    } else {
        input.classList.add(formValidation.errorClass)
        errorInput.classList.add(formValidation.inputErrorClass);
        errorInput.textContent = input.validationMessage;
    };
};

function toggleButton(form, formValidation) {
    const buttonSave = form.querySelector(formValidation.saveButtonSelector);
    const isFormValid = form.checkValidity();

    buttonSave.disabled = !isFormValid;
    buttonSave.classList.toggle('popup__save_disabled', !isFormValid);

};

function addInputListeners(form, formValidation) {
    const inputList = Array.from(form.querySelectorAll(formValidation.inputSelector));

    inputList.forEach(function (item) {
        item.addEventListener('input', (evt) => {
            hadleFormInput(evt, formValidation);
        });
    });
};
enableValition(formValidation);