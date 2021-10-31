import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { updateTableCell } from "../../redux/reducers/tables/actionCreators";

interface ICellProps {
  time: {
    hours: number;
    minutes: number;
  };
  id: string;
  className?: string;
  editable?: boolean;
}

export default function Cell({
  time,
  className,
  id,
  editable,
}: ICellProps): ReactElement {
  const dispatch = useAppDispatch();

  const getPrefix0 = (x: number) => `${x < 10 ? `0${x}` : x}`;

  const [state, setState] = useState({
    hours: getPrefix0(time.hours),
    minutes: getPrefix0(time.minutes),
    edited: false,
    memberId: "",
    rowIndex: 0,
    columnIndex: 0,
  });

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const [memberId, rowIndex, columnIndex, cell] =
      evt.currentTarget.id.split("-");
    const cellType = cell as "hours" | "minutes";
    const value = evt.currentTarget.value;

    if (
      isNaN(+value) ||
      value.length > 2 ||
      (cellType === "hours" && +value > 23) ||
      (cellType === "minutes" && +value > 59)
    ) {
      return;
    }

    setState({
      ...state,
      [cellType]: evt.currentTarget.value,
      edited: true,
      memberId: memberId,
      rowIndex: +rowIndex,
      columnIndex: +columnIndex,
    });
  };

  const onInputBlur = () => {
    setState({
      ...state,
      hours: getPrefix0(+state.hours),
      minutes: getPrefix0(+state.minutes),
    });

    if (!state.edited) {
      return;
    }

    const { memberId, rowIndex, columnIndex, hours, minutes } = state;

    dispatch(
      updateTableCell(memberId, rowIndex, columnIndex, +hours, +minutes)
    );
  };

  useEffect(
    () =>
      setState({
        hours: getPrefix0(time.hours),
        minutes: getPrefix0(time.minutes),
        edited: false,
        memberId: "",
        rowIndex: 0,
        columnIndex: 0,
      }),
    [time]
  );

  return (
    <td className={className}>
      {editable && (
        <div className="editable-cell">
          <input
            type="text"
            id={`${id}-hours`}
            value={state.hours}
            onChange={onInputChange}
            onBlur={onInputBlur}
          />
          :
          <input
            type="text"
            id={`${id}-minutes`}
            value={state.minutes}
            onChange={onInputChange}
            onBlur={onInputBlur}
          />
        </div>
      )}
      {time.hours + time.minutes
        ? `${editable ? state.hours : getPrefix0(time.hours)}:${
            editable ? state.minutes : getPrefix0(time.minutes)
          }`
        : ""}
    </td>
  );
}
