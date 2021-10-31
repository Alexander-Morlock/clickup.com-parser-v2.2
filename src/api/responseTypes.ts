export interface IMemberResponse {
  user: {
    id: number;
    username: string;
  };
}

export interface ITeamResponse {
  id: string;
  name: string;
  members: IMemberResponse[];
}

export interface IFoldersResponse {
  folders: {
    id: string;
    name: string;
  }[];
}

export interface IListsResponse {
  lists: {
    id: string;
    name: string;
  }[];
}

export interface ITagsResponse {
  name: string;
}

export interface ITasksResponse {
  tasks: {
    id: string;
    name: string;
    tags: ITagsResponse[] | [];
  }[];
}

export interface ITimingResponse {
  data:
    | []
    | {
        id: string;
        at: string;
        start: string;
        end: string;
        duration: string;
        status: string;
        task: {
          id: string;
          name: string;
        };
        user: {
          id: string;
          username: string;
        };
      }[];
}
