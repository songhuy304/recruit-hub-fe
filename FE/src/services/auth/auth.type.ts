export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ISignInRequest {
  identifier: string;
  password: string;
}

export interface ISignUpRequest {
  userName: string;
  fullName: string;
  email: string;
  password: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  password: string;
  token: string;
}

export interface IVerifyTokenRequest {
  token: string;
}
