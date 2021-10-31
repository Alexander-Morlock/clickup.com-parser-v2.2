import { ReactElement } from "react";
import { ITeam, IUser } from "../api/types";
import { useAppDispatch, useTypedSelector } from "../hooks";
import { setTeam } from "../redux/reducers/team/actionCreators";

export default function ChooseTeamList(): ReactElement {
  const teams = useTypedSelector((state) => state.teams);

  const dispatch = useAppDispatch();

  const onCheckboxInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTeamId: string = evt.target.id.split("checkbox-")[1];
    const selectedTeam: ITeam =
      teams.find((team) => team.id === selectedTeamId) || teams[0];
    dispatch(setTeam(selectedTeam));
  };

  return (
    <div>
      <h1>Choose Team ID</h1>
      <ul className="teams-list">
        {teams.map(
          (team: ITeam) =>
            team.members.length > 0 && (
              <li key={team.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${team.id}`}
                  onInput={onCheckboxInput}
                />
                <label htmlFor={`checkbox-${team.id}`}>
                  <b>TEAM ID: {team.id}</b> ({team.name})
                  <br />
                  <span className="team-members">
                    {team.members
                      .map((member: IUser) => member.name)
                      .join(", ")}
                  </span>
                </label>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
