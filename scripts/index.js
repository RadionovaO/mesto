import  Card  from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, validationConfig } from "./constants.js";

//попап редактирования профиля
const profileName = document.querySelector('.profile__info-name');
const profileText = document.querySelector('.profile__info-text');
const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const popupFormProfile = document.querySelector('.popup__form-edit');
const inputName = document.querySelector('.popup__input_type_name');
const inputWork = document.querySelector('.popup__input_type_work');

//попап добавления изображений
const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const popupFormAdd = document.querySelector('.popup__form-add');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');

function openPopup(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('mousedown', closePopupOverlay);
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('mousedown', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEsc);
};

buttonEdit.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputWork.value = profileText.textContent;
    openPopup(popupEdit);
    profileValidation.resetValidation();
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupAdd);
    addCardValidation.resetValidation();
    popupFormAdd.reset();
});

//закрытие попап
const buttonCloseList = document.querySelectorAll('.popup__close');
buttonCloseList.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

//функция сохранения изменений в профиле
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileText.textContent = inputWork.value;
    closePopup(popupEdit);
}
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);

//картинки через js
const popupImage = document.querySelector('.popup_image');
const imageBigSize = document.querySelector('.popup__big-image');
const imageBigSizeTitle = document.querySelector('.popup__image-title');
const cardBlock = document.querySelector('.elements');

function createCard(card, templateSelector, handleCardClick) {
    const oneCard = new Card(card, templateSelector, handleCardClick);
    return oneCard.createCardImage()
}

//выводит карточки на страницу
initialCards.forEach((card) => {
    cardBlock.append(createCard(card, '#cards', handleCardClick));
});

//создание карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cardBlock.prepend(createCard(
        {
            name: inputTitle.value,
            link: inputLink.value,
        },
        '#cards', handleCardClick));
    evt.target.reset();
    closePopup(popupAdd);
};
popupFormAdd.addEventListener('submit', handleCardFormSubmit);

//закрытие попап по overlay
function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup_active')) {
        closePopup(evt.target);
    };
};

//закрытие попап по esc
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_active');
        closePopup(popupActive);
    };
};
//попап просомотра карточки
function handleCardClick(name, link) {
    imageBigSize.src = link;
    imageBigSize.alt = name;
    imageBigSizeTitle.textContent = name;
    openPopup(popupImage);
};

//валидация
const profileValidation = new FormValidator(validationConfig, popupFormProfile);
profileValidation.enableValidation();


const addCardValidation = new FormValidator(validationConfig, popupFormAdd);
addCardValidation.enableValidation();
