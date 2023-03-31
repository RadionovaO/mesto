
export default class Card {
    constructor(card, templateSelector, handleCardClick, myId, { handleLikeButton, openPopupDel }) {
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._card = this._getTemplate();
        this._cardId = card._id;
        this._myId = myId;
        this.likes = card.likes;
        this._handleLikeButton = handleLikeButton;
        this._ownerId = card.owner._id;
        this._openPopupDel = openPopupDel;
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
        this._elemImage = this._card.querySelector(".element__image");
        this._elemName = this._card.querySelector(".element__title");
        this._btnDelete = this._card.querySelector(".element__delete");
        this._btnLike = this._card.querySelector(".element__like");
        this._likeCounter = this._card.querySelector('.element__like-count');

        this._elemImage.src = this._link;
        this._elemImage.alt = this._name;
        this._elemName.textContent = this._name;
        this.setLikesCount(this.likes.length);
    
        this._setEventListeners();
        return this._card;
    };

    //лайк карточки
    setLikeCard() {
        this._btnLike.classList.add('element__like_active');
    };

    delLikeCard() {
        this._btnLike.classList.remove('element__like_active');
    }

    _handleLikeButton() {
        this._btnLike.classList.toggle('element__like-active');
    }

    isCardLiked() {
        return this.likes.some((like) => like._id === this._myId);
    }

    getIdCard() {
        return this._cardId;
    }

    setLikesCount(num) {
        this.isCardLiked() ? this.setLikeCard() : this.delLikeCard();
        this._likeCounter.textContent = num;
    }

    //удаление карточки
    deleteOneCard() {
        this._cardElement.remove();
        this._cardElement = null; 
    }

    //слушатели
    _setEventListeners() {
        this._btnLike.addEventListener('click', () => this._handleLikeButton());

        if (this._ownerId === this._myId) {
            this._btnDelete.addEventListener('click',() => this._openPopupDel(this))
               // this._openPopupDel(this.deleteCard);
            
        } else { 
            this._btnDelete.remove();
        }
        
        this._elemImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
            
    };  
};

