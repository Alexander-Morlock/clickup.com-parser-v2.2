import { ITeam } from "../../../api/types";
import { ITeamAction, teamActionEnum } from "./types";

const initialState: ITeam = {
  id: "",
  name: "",
  members: []
};

export default function teamReducer(
  state = initialState,
  action: ITeamAction
): ITeam {
  switch (action.type) {
    case teamActionEnum.SET_TEAM:
      return action.payload;

    case teamActionEnum.UPDATE_MEMBER_RATE: {
      const updatedMembers = [...state.members];
      const member = updatedMembers.find(
        (member) => member.id === action.payload.id
      );

      if (member) {
        let rate = action.payload.newRate;
        if (rate.length > 1 && rate[0] === "0" && rate[1] !== ".") {
          rate = rate.substr(1);
        }
        member.rate = rate !== "0" && +rate >= 0 ? rate : "0";
      }

      return {
        ...state,
        members: updatedMembers,
      };
    }
    case teamActionEnum.INVERSE_MEMBER_ACTIVITY: {
      const updatedMembers = [...state.members];
      const memberId = action.payload;
      const member =
        updatedMembers.find((member) => member.id === memberId) ||
        updatedMembers[0];
      member.active = !member?.active;
      return {
        ...state,
        members: updatedMembers,
      };
    }

    case teamActionEnum.CLEAR_TEAM: {
      return {
        id: "",
        name: "",
        members: [],
      };
    }
    default:
      return state;
  }
}
