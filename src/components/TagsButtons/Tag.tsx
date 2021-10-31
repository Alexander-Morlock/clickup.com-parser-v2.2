import React, { ChangeEvent, ReactElement } from "react";
import { useAppDispatch } from "../../hooks";
import {
  updateTagChecked,
  updateTagOptionChecked,
} from "../../redux/reducers/filtered/actionCreators";
import { currencySymbol } from "../../utils/constants";

interface Itag {
  tag: string;
  isActive: boolean;
  isCalculated: boolean;
}

export default function Tag({
  tag,
  isActive,
  isCalculated,
}: Itag): ReactElement {
  const dispatch = useAppDispatch();

  const onCheckboxIsActive = (evt: ChangeEvent<HTMLInputElement>): void => {
    const tag: string = evt.currentTarget.id.split("tag-checkbox-")[1];
    dispatch(updateTagChecked(tag));
  };

  const onCheckboxIsCalculated = (evt: ChangeEvent<HTMLInputElement>): void => {
    const tag: string = evt.currentTarget.id.split("tag-checkbox-optional")[1];
    dispatch(updateTagOptionChecked(tag));
  };

  return (
    <li key={`tag-${tag}`}>
      <input
        type="checkbox"
        id={`tag-checkbox-${tag}`}
        checked={isActive}
        onChange={onCheckboxIsActive}
      />
      <label htmlFor={`tag-checkbox-${tag}`}>{tag}</label>
      <label className="tag-option">
        <input
          type="checkbox"
          id={`tag-checkbox-optional${tag}`}
          checked={isCalculated}
          onChange={onCheckboxIsCalculated}
        />
        {currencySymbol}
      </label>
    </li>
  );
}
