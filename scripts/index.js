//попап редактирования профиля
const profileName = document.querySelector(".profile__info-name");
const profileText = document.querySelector(".profile__info-text");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
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
    document.addEventListener("mousedown", closePopupOverlay);
    document.addEventListener("keydown", closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove("popup_active");
    document.removeEventListener("mousedown", closePopupOverlay);
    document.removeEventListener("keydown", closePopupEsc);
    
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
const buttonCloseList = document.querySelectorAll(".popup__close");
buttonCloseList.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});

//функция сохранения изменений в профиле
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileText.textContent = inputWork.value;
    closePopup(popupEdit);
}
popupFormProfile.addEventListener("submit", handleProfileFormSubmit);

//картинки через js
const popupImage = document.querySelector(".popup_image");
const imageBigSize = document.querySelector(".popup__big-image");
const imageBigSizeTitle = document.querySelector(".popup__image-title");
const cardBlock = document.querySelector(".elements");

const cardTemplate = document.querySelector("#cards").content;
const createCardElement = (name, link) => {
    const cardList = cardTemplate.cloneNode(true);
    const elemImage = cardList.querySelector(".element__image");
    const elemName = cardList.querySelector(".element__title");

    elemImage.src = link;
    elemImage.alt = name;
    elemName.textContent = name;

    //лайк карточки
    cardList.querySelector(".element__like").addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like_active");
    });

    //удаление карточки
    cardList.querySelector(".element__delete").addEventListener("click", function (evt) {
        evt.target.closest(".element").remove();
    });

    //открыть картинку
    cardList.querySelector(".element__image").addEventListener("click", function () {
        openPopup(popupImage);
        imageBigSize.src = link;
        imageBigSize.alt = name;
        imageBigSizeTitle.textContent = name;
    });

    return cardList;
};

function presentCardsList(cardList) {
    for (let i = 0; i < cardList.length; i++) {
        const createCard = createCardElement(initialCards[i].name, initialCards[i].link);
        cardBlock.append(createCard);
    };
};
presentCardsList(initialCards);

const buttonSaveCardForm = popupAdd.querySelector(".popup__save");


function disableCardFormSubmitButton() {
    buttonSaveCardForm.classList.add("popup__save_disabled");
    buttonSaveCardForm.disabled = true;
};

//создание карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cardBlock.prepend(createCardElement(inputTitle.value, inputLink.value));
    evt.target.reset();
    disableCardFormSubmitButton();
    closePopup(popupAdd);
};
popupFormAdd.addEventListener("submit", handleCardFormSubmit);

//const popup = document.querySelector(".popup");

//закрытие попап по overlay
function closePopupOverlay(evt) {
    if (evt.target.classList.contains("popup_active")) {
        closePopup(evt.target);
    };
};

//закрытие попап по esc
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popupActive = document.querySelector(".popup_active");
        closePopup(popupActive);
    };
};
