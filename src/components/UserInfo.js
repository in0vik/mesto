export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userNameElem = document.querySelector(userNameSelector);
    this._userJobElem = document.querySelector(userJobSelector);
    this._userAvatarElem = document.querySelector(userAvatarSelector);
    
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

  setUserAvatar(avatarLink) {
    this._userAvatarElem.src = avatarLink;
  }

}