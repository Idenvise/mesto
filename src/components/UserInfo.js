export default class UserInfo {
  constructor({name, subname, avatar, info}) {
    this._name = name;
    this._subname = subname;
    this._avatar = avatar;
    this._info = info;
    }
  getUserInfo() {
    const user = {
      name: this._name.textContent,
      subname: this._subname.textContent,
      avatar: this._avatar.src,
      id: this._info[1]._id
    }
    return user;
  }
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._subname.textContent = user.about;
    this._avatar.src = user.avatar;
  }
}
