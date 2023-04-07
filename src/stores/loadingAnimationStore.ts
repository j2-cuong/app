import { action, observable } from 'mobx';

export class LoadingAnimationStore {
  @observable loadingQueue: string[] = [];
  @action setLoading = (apiUrl: string) => {
    this.loadingQueue.push(apiUrl);
  };
  @action finishLoading = (apiUrl: string) => {
    this.loadingQueue = this.loadingQueue.filter(url => url !== apiUrl);
  };

}

export default new LoadingAnimationStore();