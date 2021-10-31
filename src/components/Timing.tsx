import { ReactElement } from "react";
import { useTypedSelector } from "../hooks";
import ChooseTeamList from "./ChooseTeamList";
import LeftPanel from "./LeftPanel";
import DatePickers from "./DatePickers";
import Tables from "./Tables";
import TagsWrapper from "./TagsButtons";

export default function Timing(): ReactElement {
  const { team } = useTypedSelector((state) => state);

  return team.id !== "" ? (
    <div className="timing-wrapper">
      <LeftPanel>
        <DatePickers />
        <TagsWrapper />
      </LeftPanel>
      <Tables />
    </div>
  ) : (
    <ChooseTeamList />
  );
}
