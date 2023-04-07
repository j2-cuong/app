import { fetcherMultipart, fetcherOptions } from '@/services/fetcher';
import axios, { Axios, AxiosResponse } from 'axios'
import { config } from '@/config';
import { TAuthenticationPayload, TLoginResponse } from '@/features/auth/components/LoginForm/types';
import { ErrorResponse, SuccessResponse, DestinationCategory, SuccessResponseTourSearch, SuccessResponseTourById } from '@/types/http.type';

export const postLogin = async (endpoint: any, payload: TAuthenticationPayload): Promise<TLoginResponse> => {
  return await axios.post(config.apiUrl + endpoint, payload).then(res => {
    return res.data
  }).catch(err => console.log(err))
}

export const post = <T>(endpoint: any, payload?: any): Promise<SuccessResponse<T>> => {
  return axios.post(config.apiUrl + endpoint, payload, fetcherOptions()).then((res: AxiosResponse<SuccessResponse<T>>) => res.data);
}

export const postDestinationCategory = <T>(endpoint: any, payload?: any): Promise<DestinationCategory<T>> => {
  return axios.post(config.apiUrl + endpoint, payload, fetcherOptions()).then((res: AxiosResponse<DestinationCategory<T>>) => res.data);
}
export const postGetTour = <T>(endpoint: any, payload?: any): Promise<SuccessResponseTourSearch<T>> => {
  return axios.post(config.apiUrl + endpoint, payload, fetcherOptions()).then((res: AxiosResponse<SuccessResponseTourSearch<T>>) => res.data);
}

export const postGetListOnly = <T>(endpoint: any, payload?: any): Promise<T> => {
  return axios.post(config.apiUrl + endpoint, payload, fetcherOptions()).then((res: AxiosResponse<T>) => res.data);
}

export const postImage = <T>(endpoint: any, payload: any): Promise<T> => {
  return axios.post(config.apiUrl + endpoint, payload, fetcherMultipart()).then((res: AxiosResponse<T>) => res.data)
}


export const postGetTourById = async <T>(endpoint: any, payload: any): Promise<SuccessResponseTourById<T>> => {
  return await axios.post(config.apiUrl + endpoint, payload, fetcherOptions()).then((res: AxiosResponse<SuccessResponseTourById<T>>)=>  res.data) 
}
