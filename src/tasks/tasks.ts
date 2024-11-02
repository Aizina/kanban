export enum Status {
    backlog = "backlog",
    ready = "ready",
    inProgress = "inProgress",
    finished = "finished",
}

export interface Task {
    id: number;
    name: string;
    description: string;
    status: Status; 
}

export interface Tasks {
    tasks: Task[];
}
