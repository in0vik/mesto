export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userJobElem = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo[username] =  this._userNameElem.value;
    this._userInfo[job] = this._userJobElem.value;
    return this._userInfo;
  }

  setUserInfo({ username, job }) {
    this._userNameElem.value = profileNameElement.textContent;
    this._userJobElem.value = profileJobElement.textContent;
  }

}