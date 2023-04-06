export default class UserInfo {
  constructor ({userName, userJob}) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }

  // возвращает текущие значения пользователя из разметки для
  // последующей вставки в форму в момент открытия попапа профиля
  getUserInfo () {
    const userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
    return userInfo;
  }
  setInputValues () {
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput = document.querySelector('.popup__input_type_job');
    const userInfo = this.getUserInfo();
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.job;
  }
  setUserInfo (info) {
    this._userName.textContent = info.name;
    this._userJob.textContent = info.job;
  }
}
