export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userJobElem = document.querySelector(userJobSelector);
    
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.username =  this._userNameElem.textContent;
    this._userInfo.job = this._userJobElem.textContent;
    return this._userInfo;
  }

  setUserInfo({ username, job }) {
    this._userNameElem.textContent = username;
    this._userJobElem.textContent = job;
  }

}