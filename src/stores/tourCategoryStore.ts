import { action, observable } from 'mobx'
import { ITourCategoryNullable } from '@/types/tourcategory.type';

type DataTypeCallback = ITourCategoryNullable & {
  callback: (param: boolean) => void;
};

export class TourCategoryStore{
    @observable categoryPayloadForm : ITourCategoryNullable = {}
    @action setCategoryPayloadForm = (object : ITourCategoryNullable) => {
        this.categoryPayloadForm = object;
    }
}

export default new TourCategoryStore();

