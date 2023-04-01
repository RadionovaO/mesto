import { Popup } from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._buttonSubmit = this._popup.querySelector('.popup__save');
    };

    renderLoading(text) {
        this._buttonSubmit.textContent = text;
    };

    open(card, myId) {
        super.open();
        this._card = card;
        this._myId = myId;
    }
    
    setSubmitHandler(submitCallback) {
        this._handleProfileFormSubmit = submitCallback;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleProfileFormSubmit(this._card, this._myId);
        });
    }; 
};