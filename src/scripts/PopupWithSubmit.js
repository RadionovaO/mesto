import { Popup } from "./Popup.js";

class PopupWithSubmit extends Popup {
    constructor(popupSelector, { handleProfileFormSubmit }) {
        super(popupSelector);
        this._handleProfileFormSubmit = handleProfileFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
    };

    serEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleProfileFormSubmit();
        });
    };
};