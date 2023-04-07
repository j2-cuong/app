import { initTourData } from '@/constants/initdata';
import { IFileObject, ITourData, ITourDetails } from '@/types/tour.type';
import { action, observable } from 'mobx';

export class TourStore {
    @observable fileList : IFileObject[] = [];
    @action setFileList = (fileList : IFileObject[]) => {
        this.fileList = []
        this.fileList = fileList;
    }

    @observable tourId : string = '';
    @action setTourId = (id: string) => {
        this.tourId = id;
    }

    @observable tourData : ITourData = initTourData;
    @action setTourData = (tourData : ITourData) => {
        this.tourData = tourData;
    }

    @observable tourDetails : ITourDetails[] = []
    @action setTourDetails = (tourDetails : ITourDetails[]) => {
        this.tourDetails = tourDetails;
    }


    @observable tourDestinations : string[] = [];
    @action setTourDestinations = (tourDestinations : string[]) => {
        this.tourDestinations = tourDestinations;
    }
}

export default new TourStore();