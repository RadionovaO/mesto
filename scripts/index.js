let profileName = document.querySelector(".profile__info-name");
let profileText = document.querySelector(".profile__info-text");
const buttonEdit = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupBlock = document.querySelector(".popup__block");
const closePopup = document.querySelector(".popup__close");
let popupForm = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let workInput = document.querySelector(".popup__input_type_work");

buttonEdit.addEventListener("click", () => {
   // evt.preventDefault();
    popup.classList.add("popup_active");

    nameInput.value = profileName.textContent;
    workInput.value = profileText.textContent;
});

closePopup.addEventListener("click", () => {
   // evt.preventDefault();
    popup.classList.remove("popup_active");
});


function formSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileText.textContent = workInput.value;
    popup.classList.remove("popup_active");
}
popupForm.addEventListener("submit", formSubmit);