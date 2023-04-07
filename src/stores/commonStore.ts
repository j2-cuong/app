import { action, observable } from 'mobx';

interface currentUser {
  account: string,
  displayName: string,
  userRole: string
}

export class CommonStore {

  /** App theme */
  @observable appTheme = localStorage.getItem('appTheme') || '#5522bb';
  @action setTheme = (themeName: string) => {
    this.appTheme = themeName;
    localStorage.setItem('appTheme', themeName);
  };

  /** Offline mode */
  @observable isOffline = false;
  @action checkIsOffline = (state: boolean) => {
    this.isOffline = state;
  };

  /** Menu object */
  // @observable currentUser : currentUser = {
  //   account: '',
  //   displayName: '',
  //   userRole: ''
  // };
  // @action setCurrentUser = (object: currentUser) => {
  //   this.currentUser = object;
  // }

}

export default new CommonStore();