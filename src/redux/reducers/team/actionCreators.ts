import { ITeam } from "../../../api/types";
import { ITeamAction, teamActionEnum } from "./types";

export function setTeam(team: ITeam): ITeamAction {
  return {
    type: teamActionEnum.SET_TEAM,
    payload: team,
  };
}

export function clearTeam(): ITeamAction {
  return {
    type: teamActionEnum.CLEAR_TEAM,
  };
}

export function updateMemberRate(memberId: string, newRate: string): ITeamAction {
  return {
    type: teamActionEnum.UPDATE_MEMBER_RATE,
    payload: {
      id: memberId,
      newRate
    },
  };
}

export function inverseMemberActivity(memberId: string): ITeamAction {
  return {
    type: teamActionEnum.INVERSE_MEMBER_ACTIVITY,
    payload: memberId
  }
}