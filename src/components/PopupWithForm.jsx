import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
            <div className="popup__block">
                <button className="popup__close"
                    type="button"
                    onClick={props.onClose}>
                    </button>
                <h2 className="popup__title">{props.title}</h2>
                <form
                    className={`popup__form popup__form-${props.name}`}
                    name={props.name}
                    noValidate>
                    {props.children}
                    <button
                        className="popup__save popup__save_disabled"
                        type="submit"
                    >{`${props.buttonText}`}</button>
                </form>
            </div>
        </div>
    
        /* <div className="popup popup_add">
                 <div className="popup__block">
                     <button className="popup__close" type="button"></button>
                     <h2 className="popup__title">Новое место</h2>
     
                     <form 
                     className="popup__form popup__form-add" 
                     action="submit" 
                     name="popup__form popup__form-add"
                     novalidate>
     
                         <input 
                         className="popup__input popup__input_type_title" 
                         type="text" 
                         name="title" 
                         value=""
                         placeholder="Название"
                         minlength="2"
                         maxlength="30"
                         required
                         id="title__input"/>
                         <span className="popup__input-error" id="title__input-error"></span>
     
                         <input 
                         className="popup__input popup__input_type_link" 
                         type="url" 
                         name="link" 
                         value=""
                         placeholder="Ссылка на картинку"
                         required
                         id="link__input"/>
                         <span className="popup__input-error" id="link__input-error"></span>
     
                         <button className="popup__save popup__save_disabled" type="submit">Создать</button>
                     </form>
                 </div>
             </div>
     
             <div className="popup popup_image">
                 <div className="popup__image-block">
                     <img className="popup__big-image" src="#" alt="#"/>
                     <p className="popup__image-title"></p>
                     <button className="popup__close" type="button"></button>
                 </div>
             </div>
     
             <div className="popup popup_avatar">
                 <div className="popup__block">
                     <button className="popup__close" type="button"></button>
                     <h2 className="popup__title">Обновить аватар</h2>
     
                     <form 
                     className="popup__form popup__form-avatar" 
                     action="submit" 
                     name="popup__form popup__form-avatar"
                     novalidate>
     
                         <input 
                         className="popup__input popup__input_type_link" 
                         type="url" 
                         name="link" 
                         value=""
                         placeholder="Ссылка на изображение"
                         required
                         id="avatar__input"/>
                         <span className="popup__input-error" id="avatar__input-error"></span>
     
                         <button className="popup__save popup__save_disabled" type="submit">Сохранить</button>
                     </form>
                 </div>
             </div>
     
             <div className="popup popup_delete">
                 <div className="popup__block">
                     <button className="popup__close" type="button"></button>
                     <h2 className="popup__title">Вы уверены?</h2>
     
                     <form 
                     className="popup__form popup__form-delete" 
                     action="submit" 
                     name="popup__form popup__form-delete"
                     id="form-delete"
                     novalidate>
                     
                         <button className="popup__save" type="submit">Да</button>
                     </form>
                 </div>
             </div> */
    );
};

export default PopupWithForm;