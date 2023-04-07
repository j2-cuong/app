export type TAuthenticationPayload = {
  partnercode: string;
  username: string;
  password: string;
}

export type TLoginResponse = {
    code: number,
    message: string,
    token: string,
    userRole: string,
    displayName: string,
    account: string
}