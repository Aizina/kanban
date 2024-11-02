// src/components/Ready.tsx
import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { moveTask } from '../store/taskSlice';
import { TasksProps } from '../store/interfaces';
import style from '../styles/Kanban.module.scss';


export const Kanban: React.FC<TasksProps> = ({status, tasksToAdd, tasksAdded}) => {

  const dispatch = useDispatch();
  const [addButton, setAddButton]  = useState(true);
  const [showDropDown, setshowDropDown] = useState(false);
  
  const handleAdd = (id: number) => {
    dispatch(moveTask(id));
    setAddButton(true);
  };

  const toggleDropDownList = () => {
    setshowDropDown(!showDropDown);
  }

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
      { addButton ? 
        <button onClick={() => setAddButton(false)} className={style.addCardButton}>+Add card</button> 
        :       
        <div className={style.dropDownList}>
          <div className={style.selectedOption} onClick={toggleDropDownList}>Select Task </div>
          {showDropDown && 
            <ul className={style.optionsList}>
              <li className={style.optionItem} onClick={toggleDropDownList}></li>
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
          }
        </div>
      }
    </div>
  );
};
