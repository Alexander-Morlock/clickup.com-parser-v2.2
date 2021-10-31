import React, { ReactElement } from "react";
import { getTeams } from "../api";
import { useAppDispatch, useTypedSelector } from "../hooks";
import {
  setAuthToken,
  setIsAuth,
  setIsError,
  setIsSubmitted,
} from "../redux/reducers/auth/actionCreators";
import { TeamsActionCreator } from "../redux/reducers/teams/actionCreators";
import { getAdaptedTeams } from "../utils";

function AuthForm(): ReactElement {
  const dispatch = useAppDispatch();
  const { isError, isSubmitted, authToken } = useTypedSelector(
    (state) => state.auth
  );

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setAuthToken(evt.currentTarget.value));

  const throwError = (): void => {
    dispatch(setIsError(true));
    dispatch(setIsSubmitted(false));
  };

  const onSubmit = (evt: React.SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(setIsSubmitted(true));

    if (authToken.match(/\W/)) {
      return;
    }
    
    getTeams(authToken)
      .then((res) => {
        if (res.teams) {
          dispatch(setIsAuth(true));
          dispatch(TeamsActionCreator.setTeams(getAdaptedTeams(res.teams)));
        } else {
          throwError();
        }
      })
      .catch(throwError);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>
        {!isError
          ? "Enter a Clickup authorization token"
          : "Request error or empty response"}
      </h1>
      <input
        type="password"
        value={authToken}
        onChange={onChange}
        disabled={isSubmitted}
        required
      />
      <button type="submit" disabled={isSubmitted}>
        {!isSubmitted ? "Authorize" : "Requesting..."}
      </button>
    </form>
  );
}

export default AuthForm;
