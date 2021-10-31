import { ReactElement } from "react";

interface IProgressBar {
  progress: {
    percent: string,
    task: string
  }
};

function ProgressBar({ progress }: IProgressBar): ReactElement {
  return (
    <div>
      <div className="progress-bar">
        <div style={{ width: progress.percent }}></div>
      </div>
      <p>Requesting {progress.task}...</p>
    </div>
  );
};

export default ProgressBar;