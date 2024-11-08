import React, { useState, useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import { Link } from 'react-router-dom';
import { moveTask } from '../store/taskSlice';
import { TasksProps } from '../store/interfaces';
import style from '../styles/Kanban.module.scss';

export const Kanban: React.FC<TasksProps> = ({status, tasksToAdd, tasksAdded}) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleAdd = useCallback((id: number) => {
    dispatch(moveTask(id));
    setIsAdding(false);
  }, [dispatch]);

  const toggleDropDownList = useCallback(() => {
    setShowDropDown(prev => !prev);
  }, []);

  return (
    <div className={style.kanbansWrap}>
      <p>{status}</p>
      <ul className={style.addedTasksList}>
        {tasksAdded.map(task => (
          <li key={task.id} className={style.addedTask}>
            <Link to={`/tasks/${task.id}`}>{task.name}</Link>
          </li>
        ))}
      </ul>

      {isAdding ? (
        <div className={style.dropDownList}>
          <div onClick={toggleDropDownList} className={style.arrowIconWrap}>
            <img src="/down-arrow.png" className={style.arrowIcon} alt="Arrow Down"/>
          </div>
          {showDropDown && (
            <ul className={style.optionsList}>
              {tasksToAdd.map((task) => (
                <li
                  key={task.id}
                  className={style.optionItem}
                  onClick={() => handleAdd(task.id)}
                >
                  {task.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className={style.addCardButton}>+ Add card</button>
      )}
    </div>
  );
};
