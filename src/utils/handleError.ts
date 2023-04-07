import { API_DATA_CODE_RESPONSE, API_DATA_MESSAGE_RESPONSE, MESSAGE_MODAL_VI } from "@/constants/constants";
import { TLoginResponse } from "@/features/auth/components/LoginForm/types";
import {message} from 'antd'

export const handleLoginError = (data : any)=> {
    const {code} = data;
    if(data){
        if(code === API_DATA_CODE_RESPONSE && data.message === API_DATA_MESSAGE_RESPONSE.SIGNIN_NOT_FOUND){
            message.error(MESSAGE_MODAL_VI.SIGNIN_NOT_FOUND)
            return;
        }
        if( code !== API_DATA_CODE_RESPONSE.SUCCESS)
            message.error(data.message)
            return;
        }
    }

