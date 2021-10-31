import { ITeam } from "../../../api/types";
import { ISetTeamsAction, teamsActionEnum } from "./types";

const initialState: ITeam[] = [];

export default function teamsReducer(
  state = initialState,
  action: ISetTeamsAction
): ITeam[] {
  switch (action.type) {
    case teamsActionEnum.SET_TEAMS: 
      return action.payload;

    default:
      return state;
  }
}
