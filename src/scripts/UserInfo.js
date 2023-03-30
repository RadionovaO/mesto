export default class UserInfo {
    constructor({ nameSelector, workSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._work = document.querySelector(workSelector);
        this.getUserId = this.getUserId.bind(this);
        this._avatar = document.querySelector(avatarSelector);
        
    };

    getUserInfo() {
        this._infoValues = {}
        this._infoValues['name'] = this._name.textContent,
        this._infoValues['work'] = this._work.textContent
        
        return this._infoValues;
    };

    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._work.textContent = userData.about;
    };

    setAvatar(link) {
        this._avatar.src = link.avatar;
    };

    getUserId() {
        return this._id;
    };

    setUserId(id) {
        this._id = id;
    };
};