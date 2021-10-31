export function getMemberTimingUrl(teamId: string, memberId: string) {
  return `https://private-anon-ef44cadba4-clickup20.apiary-proxy.com/api/v2/team/${teamId}/time_entries?start_date=0&end_date=${Date.now()}&assignee=${memberId}`;
}

export function getSpacesUrl(teamId: string) {
  return `https://private-anon-80089f7db4-clickup20.apiary-proxy.com/api/v2/team/${teamId}/space`;
}

export function getFoldersUrl(spaceId: string) {
  return `https://private-anon-e2696e5967-clickup20.apiary-proxy.com/api/v2/space/${spaceId}/folder`;
}

export function getListsUrl(folderId: string) {
  return `https://private-anon-52b8ecf9e4-clickup20.apiary-proxy.com/api/v2/folder/${folderId}/list`;
}

export function getFolderlessListsUrl(spaceId: string) {
  return `https://private-anon-13de563534-clickup20.apiary-proxy.com/api/v2/space/${spaceId}/list`;
}

export function getTasksUrl(listId: string) {
  return `https://private-anon-421bc134a9-clickup20.apiary-proxy.com/api/v2/list/${listId}/task`;
}
