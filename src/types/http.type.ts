export interface SuccessResponse<T> {
    code?: number,
    message: string,
    data: T
}

export interface DestinationCategory<T> {
    message: string,
    data: T
}
export interface SuccessResponseTourSearch<T> {
    message: string,
    data: {
        totalNumber: string,
        dataList : T
    }
}

export interface SuccessResponseTourById<T> {
    message: string,
    data: {
        data : T
    }
}


export interface ErrorResponse<T> {
    message: string,
    data?: T
}