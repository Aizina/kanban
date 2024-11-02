export type Task = {
    id: number;
    name: string;
    description: string;
    status: Status; 
};

export enum Status {
    BACKLOG = "backlog",
    READY = "ready",
    IN_PROGRESS = "inProgress",
    FINISHED = "finished",
}

export interface TasksState {
    tasks: Task[];
}

export interface TasksProps {
    status: string;
    tasksToAdd : Task[];
    tasksAdded: Task[];
}

export interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    year: number;
  }

export enum UserStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed'
}
 export interface UserState {
    user: User | null;
    status: UserStatus;
  }
  
