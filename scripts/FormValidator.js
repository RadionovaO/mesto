

export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._inputSpanSelector = validationConfig.inputSpanSelector;
        this._saveButtonSelector = validationConfig.saveButtonSelector;
        this._disabledButtonClass = validationConfig.disabledButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._input = this._formElement.querySelectorAll(this._inputSelector);
    }

    _disableSubmit(evt) {
        evt.preventDefault();
    };

    enableValidation() {
        this._formElement.addEventListener('submit', this._disableSubmit);
        this._formElement.addEventListener('input', (evt) => {
             this._hadleFormInput(evt);
             this._toggleButton(this._formElement, this._validationConfig.buttonSubmit);
         });
        
        this._toggleButton(this._formElement, this._validationConfig.buttonSubmit);       
    };

    //добавляет класс ошибкой
    _showInputError = (input) => {
        this._input.classList.add( this._validationConfig.errorClass)
        this._errorInput.classList.add(this._validationConfig.inputErrorClass);
        this._errorInput.textContent = this._input.validationMessage;
    };

    //удаляет класс с ошибкой
    _hideInputError = (input) => {
        this._input.classList.remove( this._validationConfig.errorClass)
        this._errorInput.classList.remove( this._validationConfig.inputErrorClass);
        this._errorInput.textContent = '';
    };

    //проверяет валидность поля
    _hadleFormInput(evt) {
        this._input = evt.target;
        this._inputId = this._input.id;
        this._errorInput = document.querySelector(`#${this._inputId}-error`);
        if (this._input.validity.valid) {
            this._hideInputError(this._input);
        } else {
            this._showInputError(this._input);
        };
    };

    //переключает кнопку
    _toggleButton() {
        this._buttonSubmit = this._formElement.querySelector(this._validationConfig.saveButtonSelector);
        this._isFormValid = this._formElement.checkValidity();
        this._buttonSubmit.disabled = !this._isFormValid;
        this._buttonSubmit.classList.toggle(this._validationConfig.disabledButtonClass, !this._isFormValid);
    };
};
