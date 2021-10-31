import { preFilledAuthToken } from "../../../utils/constants";
import { authActionEnum, IAuthAction, IAuthState } from "./types";

const initialState: IAuthState = {
  isAuth: false,
  isError: false,
  isSubmitted: false,
  authToken: preFilledAuthToken,
};

export default function authReducer(
  state = initialState,
  action: IAuthAction
): IAuthState {
  switch (action.type) {
    case authActionEnum.SET_IS_AUTH:
      return { ...state, 
        isAuth: action.payload,
        isError: !action.payload,
        isSubmitted: !action.payload,
       };

    case authActionEnum.SET_IS_ERROR:
      return { ...state, 
        isError: action.payload,
        isAuth: !action.payload,
        isSubmitted: false
       };

    case authActionEnum.SET_IS_SUBMITTED:
      return { ...state, isSubmitted: action.payload };

    case authActionEnum.SET_AUTH_TOKEN:
      return { ...state, authToken: action.payload };

    default:
      return state;
  }
}
