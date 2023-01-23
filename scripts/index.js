//попап редактирования профиля
let profileName = document.querySelector(".profile__info-name");
let profileText = document.querySelector(".profile__info-text");
const buttonEdit = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupBlock = document.querySelector(".popup__block");
const closePopup = document.querySelector(".popup__close");
let popupForm = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let workInput = document.querySelector(".popup__input_type_work");

const initialCards = [
    {
        name: 'Турция',
        link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_e5b30413698d2f3d2b4bb9664d13b780.jpg'
    },
    {
        name: 'США',
        link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_f8d799844dde4b1dd82e5978f262fb8d.jpg'
    },
    {
        name: 'Исландия',
        link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_ddcdcfbb3202963d4a45e96495309372.jpg'
    },
    {
        name: 'Бразилия',
        link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_3ffcf5b43510bce688724fbe206d769d.jpg'
    },
    {
        name: 'Португалия',
        link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_41d2ec88a051e47cd29781455a297397.jpg'
    },
    {
        name: 'Боливия',
        link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_70314773d277c4ace8cf8ffaabcbd4dd.jpg'
    }
];
//попап добавления изображений
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
let popupFormAdd = document.querySelector(".popup__form-add");
let titleInput = document.querySelector(".popup__input_type_title");
let linkInput = document.querySelector(".popup__input_type_link");
//const elements = document.querySelector(".elements");
let elemImage = document.querySelector(".element__image");
let elemName = document.querySelector(".element__title");
const btnLike = document.querySelector(".element__like");
const btnDelete = document.querySelector(".element__delete");

//открыте/закрытие попап
function openClosePopup(popup) {
    popup.classList.toggle("popup_active");
};

buttonEdit.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    workInput.value = profileText.textContent;
    openClosePopup(popupEdit);
});

buttonAdd.addEventListener("click", () => {
    openClosePopup(popupAdd);
});

//закрытие попап
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => openClosePopup(popup));
});

//сабмит функция
function formSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = workInput.value;
    openClosePopup(popup);
}
popupForm.addEventListener("submit", formSubmit);

//картинки через js
const popupImage = document.querySelector(".popup__image");
const bigImage = document.querySelector(".popup__big-image");
const bigImageTitle = document.querySelector(".popup__image-title");
const cardBlock = document.querySelector(".elements");

const cardTemplate = document.querySelector("#cards").content;
const cardElement = (name, link) => {
    const card = cardTemplate.cloneNode(true);

    card.querySelector(".element__image").src = link;
    card.querySelector(".element__image").alt = name;
    card.querySelector(".element__title").textContent = name;

    //лайк карточки
    card.querySelector(".element__like").addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like_active");
    });

    //удаление карточки
    card.querySelector(".element__delete").addEventListener("click", function (evt) {
        evt.target.closest(".element").remove();
    });

    //открыть картинку
    //card.querySelector("element").addEventListener("click", function (evt) {
      //  openClosePopup(popupImage);
      //  bigImage.src = evt.target.src;
      //  bigImageTitle.textContent = evt.target.textContent;
    //})

    return card;
};

function presentCards(card) {
    for (let i = 0; i < card.length; i++) {
        const createCard = cardElement(initialCards[i].name, initialCards[i].link);
        cardBlock.append(createCard);
    };
};
presentCards(initialCards);

//создание карточки
function newCardSubmit(evt) {
    evt.preventDefault();
    cardBlock.prepend(cardElement(titleInput.value, linkInput.value));
    evt.target.reset();
    openClosePopup(popupAdd);
};
popupFormAdd.addEventListener("submit", newCardSubmit);