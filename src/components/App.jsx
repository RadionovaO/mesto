import React, { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);



    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardClick(card) {
        setSelectedCard(card);
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    };

    return (

        <div className='page__content'>
            <Header />

            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />

            <Footer />

            <PopupWithForm
                name='edit'
                title='Редактировать профиль'
                buttonText='Сохранить'
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            >
                <input
                    className='popup__input popup__input_type_name'
                    type='text'
                    name='name'
                    placeholder='Имя'
                    minLength='2'
                    maxLength='40'
                    required
                    id='name__input'
                />
                <span className='popup__input-error' id='name__input-error'></span>
                <input
                    className='popup__input popup__input_type_work'
                    type='text'
                    name='work'
                    placeholder='Род деятельности'
                    required
                    minLength='2'
                    maxLength='200'
                    id='work__input'
                />
                <span className='popup__input-error' id='work__input-error'></span>
            </PopupWithForm>
          

            <PopupWithForm
                name='add'
                title='Новое место'
                buttonText='Создать'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                <input
                    className='popup__input popup__input_type_title'
                    type='text'
                    name='title'
                    placeholder='Название'
                    minLength='2'
                    maxLength='30'
                    required
                    id='title__input'
                />
                <span className='popup__input-error' id='title__input-error'></span>
                <input
                    className='popup__input popup__input_type_link'
                    type='url'
                    name='link'
                    placeholder='Ссылка на картинку'
                    required
                    id='link__input'
                />
                <span className='popup__input-error' id='link__input-error'></span>
            </PopupWithForm>
              
            <PopupWithForm
                name='avatar'
                title='Обновить аватар'
                buttonText='Обновить аватар'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            >
                <input
                    className='popup__input popup__input_type_link'
                    type='url'
                    name='link'
                    placeholder='Ссылка на изображение'
                    required
                    id='avatar__input'
                />
                <span className="popup__input-error" id="avatar__input-error"></span>
            </PopupWithForm>
          
            <PopupWithForm
                name='delete'
                title='Вы уверены?'
                buttonText='Вы уверены?'
                onClose={closeAllPopups}
            >
            </PopupWithForm>
          
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}>
              
            </ImagePopup>
    
        </div>
    );
};

export default App;
