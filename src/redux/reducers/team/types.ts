import { ITeam } from "../../../api/types";

export enum teamActionEnum {
  SET_TEAM = "SET_TEAM",
  CLEAR_TEAM = "CLEAR_TEAM",
  UPDATE_MEMBER_RATE = "UPDATE_MEMBER_RATE",
  INVERSE_MEMBER_ACTIVITY = "INVERSE_MEMBER_ACTIVITY",
}

interface ISetTeamAction {
  type: teamActionEnum.SET_TEAM;
  payload: ITeam;
}

interface IClearTeamAction {
  type: teamActionEnum.CLEAR_TEAM;
}

interface IUpdateMemberRateAction {
  type: teamActionEnum.UPDATE_MEMBER_RATE;
  payload: {
    id: string;
    newRate: string;
  };
}

interface IUpdateMemberActive {
  type: teamActionEnum.INVERSE_MEMBER_ACTIVITY;
  payload: string
}

export type ITeamAction = ISetTeamAction | IUpdateMemberRateAction | IUpdateMemberActive | IClearTeamAction;