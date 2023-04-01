
import './index.css';
import { validationConfig } from "../utils/constants.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Api from '../scripts/Api.js';
import PopupWithSubmit from '../scripts/PopupWithSubmit.js';

let myId;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        authorization: '15144cc9-7b57-4999-8446-a83117a0b7b6',
        'Content-Type': 'application/json'
    },
})

const userInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    workSelector: '.profile__info-text',
    avatarSelector: '.profile__avatar'
});

Promise.all([api.getUserInfo(), api.getInitialCards()])  
        .then(([usersData, cardSection]) => {
        userInfo.setUserInfo(usersData);
        userInfo.setAvatar(usersData);
        myId = usersData._id;
        cardBlock.renderItems(cardSection.reverse());
    }) 
    .catch((err) => {
        console.log(err);
}) 

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAvatar = document.querySelector('.profile__avatar-button');

const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();
function handleCardClick(name, link) {
    popupImage.open(name, link);
};


function createCard(card, templateSelector, handleCardClick) {
    const oneCard = new Card(card, templateSelector, handleCardClick, myId,
        {
            handleLikeButton: () => {
                if (!oneCard.isCardLiked()) {
                    api.likeCard(oneCard.getIdCard())
                        .then((res) => {
                            oneCard.setLikesCount(res.likes.length);
                            oneCard.setLikeCard();
                            oneCard.likes = res.likes;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    api.deleteLikeCard(oneCard.getIdCard())
                        .then((res) => {
                            oneCard.setLikesCount(res.likes.length);
                            oneCard.delLikeCard();
                            oneCard.likes = res.likes;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }, 
            openPopupDel: (card) => {
                popupCardDelete.open();
                popupCardDelete.setSubmitHandler(() => {
                    popupCardDelete.renderLoading('Удаление...');
                    api.deleteCard(card.getIdCard())
                        .then(() => {
                            card.deleteOneCard();
                            popupCardDelete.close();
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => popupCardDelete.renderLoading('Да'));
                });
            }  
       }
    )
    return oneCard.createCardImage();
};

//попап удаления
const popupCardDelete = new PopupWithSubmit('.popup_delete')
 
popupCardDelete.setEventListeners();

const cardBlock = new Section({
    renderer: (card) => {
        cardBlock.addItem(createCard(card, '#cards', handleCardClick))
    }
}, '.elements');

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
                cardBlock.addItem(createCard(card, '#cards', handleCardClick));
                popupAdd.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => popupAdd.renderLoading('Создать'));
    },
});
popupAdd.setEventListeners();


buttonAdd.addEventListener('click', () => {
    popupAdd.open();
    addCardValidation.resetValidation();
});

//изменение аватара
const popupAvatar = new PopupWithForm('.popup_avatar', {
    handleProfileFormSubmit: (newAvatar) => {
        popupAvatar.renderLoading('Сохранение...');
        api.changeAvatar(newAvatar)
            .then((avatar) => {
                userInfo.setAvatar(avatar);
                popupAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => popupAvatar.renderLoading('Сохранить'));
    }
});
popupAvatar.setEventListeners();

buttonAvatar.addEventListener('click', () => {
    popupAvatar.open();
    avatarValidation.resetValidation();
});

const popupFormProfile = document.querySelector('.popup__form-edit');
const popupFormAdd = document.querySelector('.popup__form-add');
const popupFormAvatar = document.querySelector('.popup__form-avatar');

//валидация
const profileValidation = new FormValidator(validationConfig, popupFormProfile);
profileValidation.enableValidation();


const addCardValidation = new FormValidator(validationConfig, popupFormAdd);
addCardValidation.enableValidation();

const avatarValidation = new FormValidator(validationConfig, popupFormAvatar);
avatarValidation.enableValidation();
