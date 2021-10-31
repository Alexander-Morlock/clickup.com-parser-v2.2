import { getData } from "../api";
import { useAppDispatch, useTypedSelector } from "./";
import { setIsError } from "../redux/reducers/auth/actionCreators";
import { timingActionCreator } from "../redux/reducers/timing/actionCreators";
import { filterTimingByDate } from "../redux/reducers/filtered/actionCreators";
import { clearTeam } from "../redux/reducers/team/actionCreators";
import { useEffect, useState } from "react";
import { isEmpty } from "../utils";

export function useTiming() {
  const [progress, setProgress] = useState({
    percent: "5%",
    task: "teams",
  });

  const state = useTypedSelector((state) => state);
  const { auth, team, timing, csv } = state;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEmpty(timing)) {
      getData(auth.authToken, team, setProgress).then((response) => {
        if (!Object.keys(response).length) {
          dispatch(setIsError(true));
          dispatch(clearTeam());
          return;
        }

        dispatch(timingActionCreator.setTiming(response));
      });
    }

    dispatch(filterTimingByDate(state.timing));
  }, [timing]);

  return { timing, team, csv, state, progress };
}
