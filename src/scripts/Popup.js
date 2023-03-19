class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close');
    }

    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose); 
    };

    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        };
    };

    _closePopupOverlay = (evt) => {
        if (evt.target === this._popup) {
            this.close();
        };
    };
    

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', this._closePopupOverlay);
    };

};
export { Popup };