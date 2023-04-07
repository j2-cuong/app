export interface IDestination {
    code: string;
    nameVi: string;
}

export interface IDestinationRes {
    value: string;
    label: string;
}

export interface IBookingData {
    tourCode : string,
    tourName : string,
    bookingId: string, 
    tourId: string, 
    seatsNumber: string,
    childNo: string,
    adultNo: string, 
    userId: string, 
    createdBy: string, 
    createdTime: string, 
    updatedBy: string, 
    updatedTime: string, 
    price: string, 
    partnerCode: string, 
    discountAmount: string, 
    paymentPrice: string, 
    lastIssueDate: string,
    visaPrice: string, 
    privateRoomPrice: string, 
    statusCode: string,
    note: string,
    infantNo: string
}
export interface IBookingTransaction {
    userId: string,
    time: string,
    amount: string,
    partnerCode: string
}

export interface ITourData {
    tourId: string,
    tourName: string,
    typeId: string,
    partnerCode: string,
    departureTime: string,
    arrivalTime: string,
    price: string,
    createdBy: string,
    createdTime: string,
    updatedBy: string,
    updatedTime: string,
    seatsNumber: string,
    timeLimit: string,
    firstCharge: string,
    secondChargeTime: string,
    visaPrice: string,
    privateRoomPrice: string,
    adtprice: string,
    chdprice: string,
    infprice: string,
    departureLocationCode: string,
    isPrivateTour: string,
    timeDesc: string,
    vehicleDesc: string,
    destinationDesc: string,
    idealTimeDesc: string,
    targetDesc: string,
    specialOfferDesc: string,
    tourCode: string,
    day: string,
    night: string
}


