import React from "react";

function Card({ card, onCardClick }) {
    
    function handleClick() {
        onCardClick(card);
    };

    return (
        <div className="element">
            <img className="element__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick} />
            <div className="element__name">
                <h2 className="element__title">{card.name}</h2>
                <div>
                    <button className="element__like" type="button" aria-label="Нравится"></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
                <button className="element__delete" type="button" aria-label="Удалить"></button>
            </div>
        </div>
    );
};

export default Card;