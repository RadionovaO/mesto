
import './index.css';
import { initialCards, validationConfig } from "../utils/constants.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Api from '../scripts/Api.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        authorization: '15144cc9-7b57-4999-8446-a83117a0b7b6',
        'Content-Type': 'application/json'
    },
})

let myId;

//получаем карточки
api.getInitialCards()
    .then((arr) => cardBlock.renderItems(arr));

//получаем данные профиля
Promise.resolve(api.getUserInfo())
    .then((res) => {
        userInfo.setUserInfo(res)
       // myId = res._myId;
    })
    .catch((err) => {
        console.log(err)
    });


const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
//const buttonAvatar = document.querySelector('.profile__avatar-button');

const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();
function handleCardClick(name, link) {
    popupImage.open(name, link);
};


function createCard(card, templateSelector, handleCardClick) {
    const oneCard = new Card(card, templateSelector, handleCardClick, myId,
        { handleLikeButton: () => {
        if (oneCard.isCardLiked()) {
            api.likeCard(oneCard.getIdCard())
                .then((res) => {
                    console.log(res);
                    oneCard.setLikeCard();
                    oneCard.setLikesCount(res.likes.length);
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.deleteLikeCard(oneCard.getIdCard())
                .then((res) => {
                    console.log(res);
                    oneCard.setLikesCount(res.likes.length);
                    oneCard.delLikeCard();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
})
    return oneCard.createCardImage()
};

const cardBlock = new Section({
    renderer: (card) => {
        cardBlock.addItem(createCard(card, '#cards', handleCardClick))
    }
}, '.elements');


cardBlock.renderItems(initialCards);

const userInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    workSelector: '.profile__info-text',
    avatarSelector: '.profile__avatar'
});

//создание попапа редактирования
const popupEdit = new PopupWithForm('.popup_edit', {
    handleProfileFormSubmit: (userData) => {
        popupEdit.renderLoading('Сохранение...');
        api.changeUserInfo(userData)
            .then((userData) => {
                userInfo.setUserInfo(userData);
                popupEdit.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => popupEdit.renderLoading('Сохранить'));
    },
});
popupEdit.setEventListeners();

buttonEdit.addEventListener('click', () => {
    const user = userInfo.getUserInfo();
    popupEdit.setInputValues(user);
    popupEdit.open();
    profileValidation.resetValidation();
});

//создание попапа добавления карточки
const popupAdd = new PopupWithForm('.popup_add', {
    handleProfileFormSubmit: (card) => {
        popupAdd.renderLoading('Сохранение...');
        api.addCard(card)  
            .then((card) => {
                cardBlock.addItem(createCard({
                    name: card.name,
                    link: card.link
                }, '#cards', handleCardClick));
                popupAdd.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => popupAdd.renderLoading('Сохранить'));
    },
});
popupAdd.setEventListeners();


buttonAdd.addEventListener('click', () => {
    popupAdd.open();
    addCardValidation.resetValidation();
});

//изменение аватара





const popupFormProfile = document.querySelector('.popup__form-edit');
const popupFormAdd = document.querySelector('.popup__form-add');
//const popupFormAvatar = document.querySelector('.popup__form-avatar');

//валидация
const profileValidation = new FormValidator(validationConfig, popupFormProfile);
profileValidation.enableValidation();


const addCardValidation = new FormValidator(validationConfig, popupFormAdd);
addCardValidation.enableValidation();

//const avatarValidation = new FormValidator(validationConfig, popupFormAvatar);
//avatarValidation.enableValidation();
