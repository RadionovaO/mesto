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

    setEventListeners() {
        super.setEventListeners();
        //this._formValues = {};
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleProfileFormSubmit(this._getInputValues());
        });
    };
};


