import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Backlog } from '../components/Backlog';
import { Kanban } from '../components/Kanban';
import { RootState } from '../store/store';
import { Task } from '../store/interfaces';
import style from '../styles/KanbanBoard.module.scss'

export const KanbanBoard: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [tasksBacklog, setTasksBacklog] = useState<Task[]>([]); 
  const [tasksReady, setTasksReady] = useState<Task[]>([]);  
  const [tasksInProgress, setTasksInProgress] = useState<Task[]>([]);  
  const [tasksFinished, setTasksFinished] = useState<Task[]>([]);  

  useEffect(() => {
    setTasksBacklog(tasks.filter((task) => task.status === 'backlog'));
    setTasksReady(tasks.filter((task) => task.status === 'ready'));
    setTasksInProgress(tasks.filter((task) => task.status === 'inProgress'));
    setTasksFinished(tasks.filter((task) => task.status === 'finished'));
  }, [tasks]); 



  return (
    <div className={style.kanbanWrap}>
      <Backlog tasks={tasksBacklog}/>
      <Kanban status="Ready" tasksToAdd={tasksBacklog} tasksAdded={tasksReady}/>
      <Kanban status="In Progress" tasksToAdd={tasksReady} tasksAdded={tasksInProgress}/>
      <Kanban status="Finished" tasksToAdd={tasksInProgress} tasksAdded={tasksFinished}/>
    </div>

  );
};
