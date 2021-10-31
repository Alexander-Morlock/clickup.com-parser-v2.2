import { ITeamResponse, ITimingResponse } from "./responseTypes";

import {
  getFolderlessListsUrl,
  getFoldersUrl,
  getListsUrl,
  getMemberTimingUrl,
  getSpacesUrl,
  getTasksUrl,
} from "./urlGenerator";

import {
  IFetchOptions,
  IFolder,
  IList,
  ISpace,
  ITagsByTaskId,
  ITask,
  ITeam,
  ITiming,
} from "./types";

import {
  extractIds,
  reduceFoldersArray,
  reduceListsArray,
  reduceTasksArray,
} from "../utils";

const GET_TEAMS_URL =
  "https://private-anon-df8845e7cc-clickup20.apiary-proxy.com/api/v2/team";

function customFetch(url: string, options: IFetchOptions) {
  return fetch(url, options).then((res) => res.json());
}

function getFetchOptions(authToken: string) {
  return {
    method: "GET",
    headers: {
      Authorization: authToken,
    },
  };
}

async function getTeams(authToken: string) {
  return (await customFetch(GET_TEAMS_URL, getFetchOptions(authToken))) as {
    teams: ITeamResponse[];
  };
}

async function getData(authToken: string, team: ITeam, setProgress: Function) {
  // get spaces

  const spacesResponse: ISpace[] = (
    await customFetch(getSpacesUrl(team.id), getFetchOptions(authToken))
  ).spaces;
  const spaces = spacesResponse.map(({ id, name }) => ({ id, name }));
  setProgress({ percent: "20%", task: "folders" });

  // get folders

  const folders: IFolder[] = reduceFoldersArray(
    await Promise.all(
      spaces.map((space) =>
        customFetch(getFoldersUrl(space.id), getFetchOptions(authToken))
      )
    )
  );

  setProgress({ percent: "40%", task: "lists" });

  // get lists

  const lists: IList[] = reduceListsArray(
    await Promise.all(
      extractIds(folders).map((id) =>
        customFetch(getListsUrl(id), getFetchOptions(authToken))
      )
    )
  );

  const folderlessLists: IList[] = reduceListsArray(
    await Promise.all(
      spaces
        .map((space) => space.id)
        .map((id) =>
          customFetch(getFolderlessListsUrl(id), getFetchOptions(authToken))
        )
    )
  );

  setProgress({ percent: "60%", task: "tasks" });

  // get tasks

  const tasks: ITask[] = reduceTasksArray(
    await Promise.all(
      extractIds([...lists, ...folderlessLists]).map((id) =>
        customFetch(getTasksUrl(id), getFetchOptions(authToken))
      )
    )
  );

  setProgress({ percent: "80%", task: "timing" });

  // extract tags

  const tagsByTaskId: ITagsByTaskId = {};

  tasks.forEach((task) => {
    tagsByTaskId[task.id] = task.tags.length ? task.tags : ["_No-tag_"];
  });

  // get timing for each member

  const timingResponse: ITimingResponse[] = (
    await Promise.all(
      team.members.map((member) =>
        customFetch(
          getMemberTimingUrl(team.id, member.id),
          getFetchOptions(authToken)
        )
      )
    )
  ).filter((timingEntry) => timingEntry.data.length);

  const timing: ITiming = {};
  Object.values(timingResponse).forEach((memberTimingResponse) => {
    const entries = memberTimingResponse.data
      .filter(({ task }) => task?.id)
      .map(({ id, at, start, end, duration, status, task }) => ({
        id,
        at,
        start,
        end,
        duration,
        tags: tagsByTaskId[task.id] || ["_No-tag_"],
        task: {
          id: task.id,
          name: task.name,
          status,
        },
      }))
      .sort((a, b) => +a.start - +b.start);
    if (entries.length) {
      timing[memberTimingResponse.data[0].user.id] = entries;
    }
  });

  return timing;
}

export { getTeams, getData };
