import commonStore, { CommonStore } from './commonStore';
import authenticationStore, { AuthenticationStore } from '@/stores/authenticationStore';
import loadingAnimationStore, { LoadingAnimationStore } from '@/stores/loadingAnimationStore';
import tourCategoryStore, {TourCategoryStore} from '@/stores/tourCategoryStore';
import tourStore, { TourStore } from '@/stores/tourStore';

export type RootStore = {
  authenticationStore: AuthenticationStore;
  commonStore: CommonStore;
  loadingAnimationStore: LoadingAnimationStore;
  tourCategoryStore: TourCategoryStore;
  tourStore: TourStore
}

const rootStore: RootStore = {
  authenticationStore,
  commonStore,
  loadingAnimationStore,
  tourCategoryStore,
  tourStore
};

export default rootStore;