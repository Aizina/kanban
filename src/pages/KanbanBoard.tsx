import React from 'react';
import { useSelector } from 'react-redux';
import { Backlog } from '../components/Backlog';
import { Kanban } from '../components/Kanban';
import { RootState } from '../store/store';
import style from '../styles/KanbanBoard.module.scss';
import { GroupedTasks } from '../store/interfaces';

export const KanbanBoard: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const groupedTasks = tasks.reduce<GroupedTasks>(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    { backlog: [], ready: [], inProgress: [], finished: [] }
  );

  const kanbanColumns = [
    { status: 'Ready', tasksToAdd: groupedTasks.backlog, tasksAdded: groupedTasks.ready },
    { status: 'In Progress', tasksToAdd: groupedTasks.ready, tasksAdded: groupedTasks.inProgress },
    { status: 'Finished', tasksToAdd: groupedTasks.inProgress, tasksAdded: groupedTasks.finished }
  ];

  return (
    <div className={style.kanbanWrap}>
      <Backlog tasks={groupedTasks.backlog} />
      {kanbanColumns.map((col, index) => (
        <Kanban key={index} status={col.status} tasksToAdd={col.tasksToAdd} tasksAdded={col.tasksAdded} />
      ))}
    </div>
  );
};
