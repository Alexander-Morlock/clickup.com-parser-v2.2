import { Middleware } from "redux";
import { IUser } from "../../api/types";
import { parseCsv } from "../reducers/csv/actionCreators";
import { IFiltered } from "../reducers/filtered";
import {
  filterTimingByDate,
  updateTags,
} from "../reducers/filtered/actionCreators";
import { filteredActionEnum } from "../reducers/filtered/types";
import { ITables } from "../reducers/tables";
import { updateTables } from "../reducers/tables/actionCreators";
import { tablesActionEnum } from "../reducers/tables/types";
import { teamActionEnum } from "../reducers/team/types";

const actionsForUpdateFiltration = [
  filteredActionEnum.SHIFT_DATES,
  filteredActionEnum.UPDATE_DATES,
];

const actionsForUpdateTables = [
  filteredActionEnum.UPDATE_TAG_CHECKED,
  filteredActionEnum.UPDATE_TAG_OPTION_CHECKED,
  teamActionEnum.INVERSE_MEMBER_ACTIVITY,
  teamActionEnum.UPDATE_MEMBER_RATE,
];

interface IAnyAction {
  type: any;
  payload?: any;
}

export const afterDispatchMiddleware: Middleware =
  (store) => (next) => (action: IAnyAction) => {
    const updateCsvMacro = () => {
      const tables: ITables = store.getState().tables;
      store.dispatch(parseCsv(tables));
    };

    const updateTablesMacro = () => {
      const filtered: IFiltered = store.getState().filtered;
      const members: IUser[] = store.getState().team.members;
      store.dispatch(updateTables(filtered, members));
      updateCsvMacro();
    };

    const firstAction = next(action);

    if (actionsForUpdateFiltration.includes(action.type)) {
      store.dispatch(filterTimingByDate(store.getState().timing));
    }

    if (actionsForUpdateTables.includes(action.type)) {
      updateTablesMacro();
    }

    if (action.type === filteredActionEnum.FILTER_TIMING_BY_DATE) {
      store.dispatch(updateTags());
      updateTablesMacro();
    }

    if (action.type === tablesActionEnum.UPDATE_TABLE_CELL) {
      updateCsvMacro();
    }

    return firstAction;
  };
