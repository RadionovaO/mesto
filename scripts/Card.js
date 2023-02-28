
export default class Card {
    constructor(card, templateSelector, handleCardClick) {
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._card = this._getTemplate();
        this._elemImage = this._card.querySelector(".element__image");
        this._elemName = this._card.querySelector(".element__title");
        this._btnDelete = this._card.querySelector(".element__delete");
        this._btnLike = this._card.querySelector(".element__like");
    }


    //создание шаблона
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    };

    //создание карточки
    createCardImage() {
        this._elemImage.src = this._link;
        this._elemImage.alt = this._name;
        this._elemName.textContent = this._name;
    
        this._setEventListeners();
        return this._card;
    };

    //лайк карточки
    _likeCard() {
        this._btnLike.classList.toggle('element__like_active');
    };

    //удаление карточки
    _deleteCard() {
        this._btnDelete.closest('.element').remove();
    };

    //слушатели
    _setEventListeners() {
        this._btnLike.addEventListener('click', () => this._likeCard());
        this._btnDelete.addEventListener('click', () => this._deleteCard());
        this._elemImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
            
    };
    
};

