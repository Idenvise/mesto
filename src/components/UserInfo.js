export default class UserInfo {
  constructor({name, subname}) {
    this._name = name;
    this._subname = subname;
    }
  getUserInfo() {
    const user = {
      name: this._name.textContent,
      subname: this._subname.textContent
    }
    return user;
  }
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._subname.textContent = user.subname;
  }
}
