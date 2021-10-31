export interface IAuthState {
  isAuth: boolean;
  authToken: string;
  isSubmitted: boolean;
  isError: boolean;
}

export enum authActionEnum {
  SET_IS_AUTH = "SET_IS_AUTH",
  SET_IS_ERROR = "SET_IS_ERROR",
  SET_IS_SUBMITTED = "SET_IS_SUBMITTED",
  SET_AUTH_TOKEN = "SET_AUTH_TOKEN",
}

export interface ISetAuthAction {
  type:
    | authActionEnum.SET_IS_AUTH
    | authActionEnum.SET_IS_ERROR
    | authActionEnum.SET_IS_SUBMITTED;
  payload: boolean;
}

export interface ISetAuthTokenAction {
  type: authActionEnum.SET_AUTH_TOKEN;
  payload: string;
}

export type IAuthAction = ISetAuthAction | ISetAuthTokenAction;