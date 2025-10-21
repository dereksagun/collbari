export type ID = string;
export interface Task {
    id: ID;
    title: string;
    description: string;
    completed: boolean;
}
export type NewTask = Omit<Task, 'id'>;
export interface Column {
    id: ID;
    name: string;
    taskIds: ID[];
}
export type NewColumn = Omit<Column, 'id'>;
export interface ColumnDetailed extends Column {
    tasks: Task[];
}
export interface Board {
    id: ID;
    columnIds: ID[];
    owner: ID;
    sharedWith: ID[];
    title: string;
}
export type NewBoard = Omit<Board, 'id'>;
export interface BoardDetailed extends Board {
    columns: ColumnDetailed[];
}
export interface UserType {
    id: ID;
    email: string;
    username: string;
    passwordHash: string;
}
export interface NewUser extends Omit<UserType, 'id' | 'passwordHash'> {
    password: string;
}
export type LoginInformation = Omit<NewUser, 'id' | 'username'>;
export type UserNonSensitive = Omit<UserType, 'passwordHash'>;
export interface loginPayload {
    user: UserNonSensitive;
    token: string;
}
//# sourceMappingURL=types.d.ts.map