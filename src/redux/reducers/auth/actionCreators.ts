import { authActionEnum, ISetAuthAction, ISetAuthTokenAction } from "./types";

export function setAuthToken(text: string): ISetAuthTokenAction {
  return {
    type: authActionEnum.SET_AUTH_TOKEN,
    payload: text,
  };
}

export function setIsAuth(value: boolean): ISetAuthAction {
  return {
    type: authActionEnum.SET_IS_AUTH,
    payload: value,
  };
}

export function setIsError(value: boolean): ISetAuthAction {
  return {
    type: authActionEnum.SET_IS_ERROR,
    payload: value,
  };
}

export function setIsSubmitted(value: boolean): ISetAuthAction {
  return {
    type: authActionEnum.SET_IS_SUBMITTED,
    payload: value,
  };
}