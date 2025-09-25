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
}

export type NewBoard = Omit<Board, 'id'>;

export interface BoardDetailed extends Board {
  columns: ColumnDetailed[];
}

export interface User {
  id: ID,
  boardIds: ID[];
}

export type NewUser = Omit<User, 'id'>;