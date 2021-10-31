import { ReactElement } from "react";
import { isEmpty } from "../utils";
import { CSVLink } from "react-csv";
import MembersList from "./MembersList";
import ProgressBar from "./ProgressBar";
import { useTiming } from "../hooks/useTiming";

function LeftPanel({ children }: { children: ReactElement[] }): ReactElement {
  const { timing, team, csv, state, progress } = useTiming();

  return !isEmpty(timing) ? (
    <div className="left-panel">
      <h1>Team: {team.name}</h1>
      <h3>(ID: {team.id})</h3>

      {children}

      <MembersList />

      <CSVLink
        data={csv}
        filename={state.team.name}
        className="download-button"
        target="_blank"
        separator=";"
      >
        Download CSV
      </CSVLink>
    </div>
  ) : (
    <ProgressBar progress={progress} />
  );
}

export default LeftPanel;
