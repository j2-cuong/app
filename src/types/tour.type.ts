import { IToursList } from '@/features/ToursMain/IToursList'
import { Dayjs } from 'dayjs'

export interface ITourData {
    tourCode: string,
    tourName: string,
    typeId: string,
    departureTime: Dayjs,
    firstCharge : string,
    visaPrice: number,
    adtprice: number,
    chdprice: number,
    infprice: number,
    privateRoomPrice: number,
    departureLocationCode : string,
    timeDesc: string,
    vehicleDesc: string,
    destinationDesc: string,
    idealTimeDesc: string,
    targetDesc: string,
    specialOfferDesc: string,
    night: number,
    day: number
}

export interface ITourDetails {
    dayNumber: number,
    description: string,
}

export interface ITourDestinations {
    destinationCode: string,
}

export interface ITourDataRequest {
    tourId?: string,
    tourData: ITourData,
    tourDetails: ITourDetails[],
    tourDestinations: ITourDestinations[],
}

export interface IFileObject {
    uid: string,
    name: string,
    status: string,
    url? : string
}

export interface IDestination {
    code: string,
    parentCode: string,
    type: string,
    nameVi: string
}

export interface ICreateTourResponse extends ITourData{
    tourId : string,
    partnerCode: string,
    createdBy: string,
    createdTime: string,
    updatedBy: string,
    updateTime: string,
}

export interface IImageUpload {
    tourId: string,
    fileList: FileList[]
}

export interface IImageUploadResponse {
    code: number,
    message: string
}

export interface ITourDataset {
    totalNumber : number;
    data: IToursList[]
  }