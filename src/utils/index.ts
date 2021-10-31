import { IFolder, IList, ITagsByTaskId, ITask, ITeam } from "../api/types";
import {
  IFoldersResponse,
  IListsResponse,
  ITagsResponse,
  ITasksResponse,
  ITeamResponse,
} from "../api/responseTypes";
import { defaultRate } from "./constants";
import { ITableCell } from "../redux/reducers/tables";

export function reduceFoldersArray(array: IFoldersResponse[]) {
  return array
    .filter((f) => f.folders?.length)
    .reduce(
      (acc: IFolder[], curr: IFoldersResponse) => [
        ...acc,
        ...curr.folders.map(({ id, name }) => ({ id, name })),
      ],
      []
    );
}

export function reduceListsArray(array: IListsResponse[]) {
  return array
    .filter((f) => f.lists?.length)
    .reduce(
      (acc: IList[], curr: IListsResponse) => [
        ...acc,
        ...curr.lists.map(({ id, name }) => ({ id, name })),
      ],
      []
    );
}

export function reduceTasksArray(array: ITasksResponse[]) {
  return array
    .filter((f) => f.tasks?.length)
    .reduce(
      (acc: ITask[], curr: ITasksResponse) => [
        ...acc,
        ...curr.tasks.map(({ id, name, tags }) => ({
          id,
          name,
          tags: reduceTags(tags),
        })),
      ],
      []
    );
}

export function reduceTags(array: ITagsResponse[]) {
  return array.map((tag) => tag.name);
}

export function extractIds(array: { id: string }[]) {
  return array.map((e) => e.id);
}

export function getAdaptedTeams(teams: ITeamResponse[]): ITeam[] {
  return teams.map(({ id, name, members }) => ({
    id,
    name,
    members: members.map((m) => ({
      id: `${m.user.id}`,
      name: m.user.username,
      rate: `${defaultRate}`,
      active: true,
    })),
  }));
}

export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

export function getDaysInMonth(month?: number) {
  const m = month || new Date().getMonth() + 1;
  const y = new Date().getFullYear();
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1);
}

export function extractTags(tagsByTaskId: ITagsByTaskId) {
  return [
    ...new Set(
      Object.values(tagsByTaskId).reduce((acc, curr) => [...acc, ...curr], [])
    ),
  ];
}

export function getDateFromUnixStamp(unix: string): string {
  const date = new Date(+unix);
  const day = date.getDate();
  const month = date.getMonth();
  return [
    day,
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][month],
  ].join("-");
}

export function getDuration(unix: string): string {
  const minutes = Math.floor(+unix / 60000);
  const hours = Math.floor(minutes / 60);
  return minutes + hours
    ? `${hours < 10 ? "0" : ""}${hours}:${
        minutes - hours * 60 < 10 ? "0" : ""
      }${minutes - hours * 60}`
    : "";
}

export function getCellState(totalMinutes: number) {
  const hoursFloat = +(totalMinutes / 60).toFixed(2);
  const hours = Math.floor(hoursFloat);
  const minutes = +totalMinutes.toFixed(2) - hours * 60;

  return { hours, minutes };
}

export function getLastElementOfArray<T>(arr: Array<T>): T {
  return arr[arr.length - 1];
}

export function getReducedRow(rows: ITableCell[]): ITableCell {
  return getCellState(
    rows.reduce((acc, curr) => acc + curr.hours * 60 + curr.minutes, 0)
  );
}

export function getReducedNumberArray(arr: number[]):number {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

export function getTimeFromCell(cell: ITableCell): string {
  return cell.hours + cell.minutes > 0 ? `${cell.hours}:${cell.minutes}` : "";
};