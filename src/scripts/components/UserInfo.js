export class UserInfo {
  constructor({ name, activity }) {
    this._name = document.querySelector(name);
    this._activity = document.querySelector(activity);
  }
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      activity: this._activity.textContent,
    };
    return userInfo;
  }
  setUserInfo(data) {
    this._name.textContent = data[0];
    this._activity.textContent = data[1];
  }
}
