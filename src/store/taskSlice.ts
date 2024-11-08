import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, Status, TasksState } from './interfaces';

const initialState: TasksState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            const newTask: Task = {
                id: Date.now(),
                name: action.payload,
                description: '', 
                status: Status.BACKLOG,
            };
            state.tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); 
        },

        moveTask: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                const statusTransition: Record<Status, Status> = {
                    [Status.BACKLOG]: Status.READY,
                    [Status.READY]: Status.IN_PROGRESS,
                    [Status.IN_PROGRESS]: Status.FINISHED,
                    [Status.FINISHED] : Status.FINISHED,
                };

                task.status = statusTransition[task.status] || task.status; 
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        changeDescription: (state, action: PayloadAction<{ id: number; description: string }>) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.description = action.payload.description;
                localStorage.setItem('tasks', JSON.stringify(state.tasks)); 
            }
        },
    },
});


export const { addTask, deleteTask, moveTask, changeDescription } = tasksSlice.actions;

export default tasksSlice.reducer;
