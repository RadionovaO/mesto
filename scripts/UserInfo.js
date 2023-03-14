export default class UserInfo {
    constructor({ nameSelector, workSelector }) {
        this._name = document.querySelector(nameSelector);
        this._work = document.querySelector(workSelector);
    };

    getUserInfo() {
        this._infoValues = {}
        this._infoValues['name'] = this._name.textContent,
        this._infoValues['work'] = this._work.textContent
        
        return this._infoValues;
    };

    setUserInfo({name, work}) {
        this._name.textContent = name;
        this._work.textContent = work;
    };
};