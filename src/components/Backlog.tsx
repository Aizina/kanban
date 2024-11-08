// src/components/Backlog.tsx
import React, { useState, useContext } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addTask } from '../store/taskSlice'; 
import style from '../styles/Kanban.module.scss';
import { Link } from 'react-router-dom';
import { TasksState } from '../store/interfaces';

export const Backlog: React.FC<TasksState> = ( {tasks}) => {
  
  const dispatch = useAppDispatch();
  const [newTask, setNewTask] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask('');
      setShowSubmit(false);
    }
  };

  return (
    <div className={style.kanbansWrap}>
      <p>Backlog</p>
      <ul className={style.addedTasksList}>
        {tasks.map(task => (
          <li key={task.id} className={style.addedTask}>
             <Link to={`/tasks/${task.id}`}> 
                {task.name}
              </Link>
          </li>
        ))}
      </ul>
      {showSubmit ? (
        <div >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task name"
            className={style.addTaskInput}
          />
          <button onClick={handleAddTask} disabled={!newTask.trim()} className={style.submitButton}>Submit</button>
        </div>
      ) : (
        <button onClick={() => setShowSubmit(true)} className={style.addCardButton}>+ Add card</button>
      )}
    </div>
  );
};
