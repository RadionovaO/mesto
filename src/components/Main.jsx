import React, { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
    
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([usersData, cardSection]) => {
                setUserName(usersData.name);
                setUserDescription(usersData.about);
                setUserAvatar(usersData.avatar);
                // myId = usersData._id;
                setCards(cardSection);
            })
                .catch((err) => {
                console.log(err);
        })
    }, [])

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-button" onClick={onEditAvatar} >
                    <img className="profile__avatar" src={userAvatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__block">
                        <h1 className="profile__info-name">{userName}</h1>
                        <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
                    </div>
                    <p className="profile__info-text">{userDescription}</p>
                </div>
                <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
            </section>

            <section className="elements">
                
                    {cards.map((card) => (
                        <Card
                            card={card}
                            name={card.name}
                            link={card.link}
                            alt={card.name}
                            key={card._id}
                            count={card.likes.length}
                            onCardClick={onCardClick}>
                            
                        </Card>
                    ))}
              
            </section>

        </main>
    );
};

export default Main;