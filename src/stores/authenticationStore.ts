import { action, observable } from 'mobx';

export class AuthenticationStore {

  /** Access token */
  @observable accessToken = localStorage.getItem('jwt') || undefined;
  @action setAccessToken = (token: string) => {
    this.accessToken = token;
  }
}

export default new AuthenticationStore();