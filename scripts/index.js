//попап редактирования профиля
const profileName = document.querySelector(".profile__info-name");
const profileText = document.querySelector(".profile__info-text");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupBlock = document.querySelector(".popup__block");
const popupClose = document.querySelector(".popup__close");
const popupFormProfile = document.querySelector(".popup__form-edit");
const inputName = document.querySelector(".popup__input_type_name");
const inputWork = document.querySelector(".popup__input_type_work");

//попап добавления изображений
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const popupFormAdd = document.querySelector(".popup__form-add");
const inputTitle = document.querySelector(".popup__input_type_title");
const inputLink = document.querySelector(".popup__input_type_link");
const elemImage = document.querySelector(".element__image");
const elemName = document.querySelector(".element__title");
const btnLike = document.querySelector(".element__like");
const btnDelete = document.querySelector(".element__delete");


function openPopup(popup) {
    popup.classList.add("popup_active");
};

function closePopup(popup) {
    popup.classList.remove("popup_active");
};

buttonEdit.addEventListener("click", () => {
    inputName.value = profileName.textContent;
    inputWork.value = profileText.textContent;
    openPopup(popupEdit);
});

buttonAdd.addEventListener("click", () => {
    openPopup(popupAdd);
});

//закрытие попап
const buttonClose = document.querySelectorAll(".popup__close");
buttonClose.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});

//функция сохранения изменений в профиле
function submitEditProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileText.textContent = inputWork.value;
    closePopup(popupEdit);
}
popupFormProfile.addEventListener("submit", submitEditProfile);

//картинки через js
const popupImage = document.querySelector(".popup_image");
const imageBigSize = document.querySelector(".popup__big-image");
const imageBigSizeTitle = document.querySelector(".popup__image-title");
const cardBlock = document.querySelector(".elements");

const cardTemplate = document.querySelector("#cards").content;
const cardElement = (name, link) => {
    const card = cardTemplate.cloneNode(true);
    const elemImage = card.querySelector(".element__image");
    const elemName = card.querySelector(".element__title");

    elemImage.src = link;
    elemImage.alt = name;
    elemName.textContent = name;

    //лайк карточки
    card.querySelector(".element__like").addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like_active");
    });

    //удаление карточки
    card.querySelector(".element__delete").addEventListener("click", function (evt) {
        evt.target.closest(".element").remove();
    });

    //открыть картинку
    card.querySelector(".element__image").addEventListener("click", function () {
        openPopup(popupImage);
        imageBigSize.src = link;
        imageBigSize.alt = name;
        imageBigSizeTitle.textContent = name;
    });

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
function submitNewCard(evt) {
    evt.preventDefault();
    cardBlock.prepend(cardElement(inputTitle.value, inputLink.value));
    evt.target.reset();
    closePopup(popupAdd);
};
popupFormAdd.addEventListener("submit", submitNewCard);