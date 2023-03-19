export default class Section {
    constructor({ renderer }, containerSelector) {
        //this._initialCards = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    };

    renderItems = (items) => {
        this._initialCards = items;
        this._initialCards.forEach((card) => this._renderer(card));
    };

    addItem = (createCard) => {
        this._containerSelector.prepend(createCard);
    };
};

