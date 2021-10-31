import { ITeam } from "../../../api/types";
import { ISetTeamsAction, teamsActionEnum } from "./types";

function setTeams(teams: ITeam[]): ISetTeamsAction {
  return {
    type: teamsActionEnum.SET_TEAMS,
    payload: teams,
  };
}

export const TeamsActionCreator = {
  setTeams
};
