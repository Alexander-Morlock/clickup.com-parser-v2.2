import { ReactElement } from "react";
import { useAppDispatch, useTypedSelector } from "../hooks";
import {
  inverseMemberActivity,
  updateMemberRate,
} from "../redux/reducers/team/actionCreators";
import { currencySymbol } from "../utils/constants";

export default function MembersList(): ReactElement {
  const state = useTypedSelector((state) => state);
  const { team, filtered } = state;
  const dispatch = useAppDispatch();

  const onRateInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const id = evt.currentTarget.id.split("rate-")[1];
    const newRate = evt.currentTarget.value;
    if (!Number.isNaN(+newRate)) {
      dispatch(updateMemberRate(id, newRate));
    }
  };

  const onActiveStatusChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const id = evt.currentTarget.id.split("checkbox-")[1];
    dispatch(inverseMemberActivity(id));
  };

  return (
    <>
      <h3>Hour rate | Member:</h3>
      <ul className="members-list">
        {Object.keys(filtered.timing).map((id) => {
          const member = team.members.find((m) => m.id === id);
          if (!member) {
            return null;
          }

          return (
            <li key={member.id} data-currency={currencySymbol}>
              <input
                type="text"
                className="member-rate-input"
                value={member.rate}
                id={`rate-${member.id}`}
                onChange={onRateInputChange}
              />
              <label>
                <input
                  type="checkbox"
                  id={`checkbox-${member.id}`}
                  checked={member.active}
                  onChange={onActiveStatusChange}
                />
                <b>{member.name}</b> (ID: {member.id})
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
