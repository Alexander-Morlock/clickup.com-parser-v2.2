import { ITeam } from "../../../api/types";

export enum teamsActionEnum {
  SET_TEAMS = "SET_TEAMS",
}

export interface ISetTeamsAction {
  type: teamsActionEnum.SET_TEAMS;
  payload: ITeam[];
};