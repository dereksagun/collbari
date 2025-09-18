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

interface TaskDetails {
  tasks: Task[]
}

export interface ColumnDetailed extends Column, TaskDetails {}

export interface Board {
  id: ID,
  columns: ID[];
}