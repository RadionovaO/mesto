import { Popup } from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageBigSize = this._popup.querySelector('.popup__big-image');
        this._imageBigSizeTitle = this._popup.querySelector('.popup__image-title');
    };

    open(name, link) {
        super.open();
        this._imageBigSize.src = link;
        this._imageBigSize.alt = name;
        this._imageBigSizeTitle.textContent = name;
    };
};
