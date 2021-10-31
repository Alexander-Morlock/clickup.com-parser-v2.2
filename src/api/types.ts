export interface IUser {
  id: string,
  name: string,
  rate: string,
  active: boolean
};

export interface ITeam {
  id: string,
  name: string,
  members: IUser[]
};

export interface ISpace {
  id: string,
  name: string
};

export interface IFolder {
  id: string,
  name: string
};

export interface IList {
  id: string,
  name: string
};

export interface ITask {
  id: string,
  name: string,
  tags: string[]
};

export interface IFetchOptions {
  method: string,
  headers: {
    Authorization: string
  }
};

export interface ITagsByTaskId {
    [key: string]: string[] | []
}

export interface ITiming {
  [memberId: string]: {
    id: string,
    at: string,
    start: string,
    end: string,
    duration: string,
    tags: string[] | [],
    task: {
      id: string,
      name: string,
      status: string
    }
  }[]
};