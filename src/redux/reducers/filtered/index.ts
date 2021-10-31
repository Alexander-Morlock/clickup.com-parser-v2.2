import { ITiming } from "../../../api/types";
import { getDaysInMonth } from "../../../utils";
import { filteredActionEnum, IDates, IFilteredAction, ITags } from "./types";

export interface IFiltered {
  dates: IDates;
  timing: ITiming;
  tags: ITags;
}

// init dates are 1->15 or 16->last-day-of-month, depends on today's date
const todayDay = new Date().getDate();

const initialState: IFiltered = {
  dates: {
    start: new Date(
      new Date(new Date().setDate(todayDay > 16 ? 16 : 1)).setHours(0, 1)
    ),
    end: new Date(
      new Date(
        new Date().setDate(todayDay === 1 ? 15 : getDaysInMonth())
      ).setHours(23, 59)
    ),
  },
  tags: {},
  timing: {},
};

export default function filteredReducer(
  state = initialState,
  action: IFilteredAction
): IFiltered {
  switch (action.type) {
    case filteredActionEnum.UPDATE_DATES:
      return {
        ...state,
        dates: action.payload,
      };

    case filteredActionEnum.SHIFT_DATES: {
      const direction = action.payload;
      let shiftedStartDay = 1;
      let monthToShift = direction === "back" ? 0 : 1;
      if (state.dates.start.getDate() < 16) {
        shiftedStartDay = 16;
        monthToShift = direction === "back" ? -1 : 0;
      }

      const shiftedStartDate = new Date(
        new Date(state.dates.start.setDate(shiftedStartDay)).setHours(0, 1)
      );
      shiftedStartDate.setMonth(shiftedStartDate.getMonth() + monthToShift);

      const shiftedEndDate = new Date(
        new Date(
          new Date(shiftedStartDate).setDate(
            shiftedStartDay === 1
              ? 15
              : getDaysInMonth(
                  new Date(
                    shiftedStartDate.getTime() + 17 * 24 * 60 * 60 * 1000
                  ).getMonth()
                )
          )
        ).setHours(23, 59)
      );

      return {
        ...state,
        dates: {
          start: shiftedStartDate,
          end: shiftedEndDate,
        },
      };
    }

    case filteredActionEnum.FILTER_TIMING_BY_DATE:
      const timing = action.payload;
      const filteredTiming: ITiming = {};

      Object.keys(timing).forEach((memberId) => {
        const newTiming = timing[memberId].filter(
          (entry) =>
            +entry.start >= state.dates.start.getTime() &&
            +entry.end <= state.dates.end.getTime()
        );
        if (newTiming.length) {
          filteredTiming[memberId] = newTiming;
        }
      });

      return {
        ...state,
        timing: filteredTiming,
      };

    case filteredActionEnum.UPDATE_TAGS: {
      const tags: ITags = {};
      const reducedTiming = Object.values(state.timing).reduce(
        (acc, curr) => [...acc, ...curr],
        []
      );
      const tagsCollection = [
        ...new Set(reducedTiming.map((entry) => entry.tags.join(" + "))),
      ].sort();
      tagsCollection.forEach((tag) => {
        tags[tag] = { isActive: true, isCalculated: true };
      });

      return {
        ...state,
        tags,
      };
    }

    case filteredActionEnum.UPDATE_TAG_CHECKED: {
      const tag = action.payload;
      const updatedTags: ITags = { ...state.tags };
      updatedTags[tag].isActive = !updatedTags[tag].isActive;

      return {
        ...state,
        tags: updatedTags,
      };
    }

    case filteredActionEnum.UPDATE_TAG_OPTION_CHECKED: {
      const tag = action.payload;
      const updatedTags: ITags = { ...state.tags };
      updatedTags[tag].isCalculated = !updatedTags[tag].isCalculated;

      return {
        ...state,
        tags: updatedTags,
      };
    }

    default:
      return state;
  }
}
