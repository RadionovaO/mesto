
import './index.css';
import { initialCards, validationConfig } from "../utils/constants.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";



const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();
function handleCardClick(name, link) {
    popupImage.open(name, link);
};

function createCard(card, templateSelector, handleCardClick) {
    const oneCard = new Card(card, templateSelector, handleCardClick);
    return oneCard.createCardImage()
}

const cardBlock = new Section({
    renderer: (card) => {
        cardBlock.addItem(createCard(card, '#cards', handleCardClick))
    }
}, '.elements');

cardBlock.renderItems(initialCards);

const userInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    workSelector: '.profile__info-text'
});

//создание попапа редактирования
const popupEdit = new PopupWithForm('.popup_edit', {
    handleProfileFormSubmit: ({ name, work }) => {
        userInfo.setUserInfo({name, work});
        popupEdit.close();
    }
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
        cardBlock.addItem(createCard({
            name: card.title,
            link: card.link
        }, '#cards', handleCardClick));
        popupAdd.close();
    }
});
popupAdd.setEventListeners();


buttonAdd.addEventListener('click', () => {
    popupAdd.open();
    addCardValidation.resetValidation();
});

const popupFormProfile = document.querySelector('.popup__form-edit');
const popupFormAdd = document.querySelector('.popup__form-add');

//валидация
const profileValidation = new FormValidator(validationConfig, popupFormProfile);
profileValidation.enableValidation();


const addCardValidation = new FormValidator(validationConfig, popupFormAdd);
addCardValidation.enableValidation();
