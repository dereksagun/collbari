export type ID = string;

export interface Task {
  id: ID,
  title: string,
  description: string,
  status: Status
};

export type NewTask = Omit<Task, 'id'>;

export const Status = {
  Todo: 'not started',
  InProgress: 'in progress',
  Done: 'completed',
  Backlog: 'backlog'
} as const;

export type Status = typeof Status[keyof typeof Status];

export interface Column {
  id: ID,
  name: string
  taskIds: ID[];
}

export type NewColumn = Omit<Column, 'id'>;


export interface ColumnDetailed extends Column {
  tasks: Task[]
}

export interface Board {
  id: ID,
  columnIds: ID[];
  owner: ID;
  sharedWith: ID[];
}

export type NewBoard = Omit<Board, 'id'>;

export interface BoardDetailed extends Board {
  columns: ColumnDetailed[];
}

export interface User {
  id: ID;
  email: string;
  username: string;
  passwordHash: string;
}

export interface NewUser extends Omit<User, 'id' | 'passwordHash'> {
  password: string;
}

export type LoginInformation = Omit<NewUser, 'id' | 'username'>

export type UserNonSensitive = Omit<User, 'passwordHash'>

export interface loginPayload {
  user: UserNonSensitive
  token: string
}