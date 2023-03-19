import {Popup} from "./Popup.js"
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleProfileFormSubmit}) {
        super(popupSelector);
        this._handleProfileFormSubmit = handleProfileFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputValues = this._popupForm.querySelectorAll('.popup__input');
        
    };

    _getInputValues() {
        this._formValues = {};
        this._inputValues.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    };

    setInputValues(data) {
        this._inputValues.forEach((input) => {
          input.value = data[input.name];
        });
    };

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleProfileFormSubmit(this._getInputValues());
        });
    };

    close() {
        
        this._popupForm.reset();
        super.close();
    };
};


