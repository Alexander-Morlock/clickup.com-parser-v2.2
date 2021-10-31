import React, { ReactElement } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useTypedSelector } from "../hooks";
import { shiftDates, updateDates } from "../redux/reducers/filtered/actionCreators";

function App(): ReactElement {
  const state = useTypedSelector((state) => state);
  const dates = state.filtered.dates;
  const dispatch = useAppDispatch();

  return (
    <div className="datepickers-wrapper">
      <h2>Date interval</h2>
      <div className="datepickers">
        <DatePicker
          selected={dates.start}
          dateFormat="dd-MMM-yyyy"
          maxDate={dates.end}
          onChange={(date: Date) => {
            dispatch(
              updateDates({
                start: date,
                end: dates.end,
              })
            );
          }}
        />
        <DatePicker
          selected={dates.end}
          dateFormat="dd-MMM-yyyy"
          minDate={dates.start}
          onChange={(date: Date) => {
            dispatch(
              updateDates({
                start: dates.start,
                end: date,
              })
            );
          }}
        />
      </div>
      <div className="date-buttons-wrapper">
        <button
          onClick={() => {
            dispatch(shiftDates("back"));
          }}
        >
          ◄
        </button>
        <button
          onClick={() => {
            dispatch(shiftDates("forward"));
          }}
        >
          ►
        </button>
      </div>
    </div>
  );
}

export default App;
