export const API_DATA_CODE_RESPONSE = {
    SUCCESS: 0,
    NOTFOUND: 404,
    ERROR: 999
} as const

export const API_DATA_MESSAGE_RESPONSE = Object.freeze(  {
    SUCCESS: "Thành công.",
    SIGNIN_NOT_FOUND: "Signin not found!"
})

export const MESSAGE_MODAL_VI = {
    //login message
    LOGIN_SUCCESS : 'Đăng nhập thành công!',
    LOGIN_FAIL : 'Đăng nhập thất bại!',
    SIGNIN_NOT_FOUND: 'Sai thông tin đăng nhập!',

    //page message
    PAGE_NOT_FOUND : 'Không tìm thấy trang!',
    API_NOT_FOUND : 'API không tồn tại!',


    DELETE_SUCCESS : 'Xóa thành công!'
} as const