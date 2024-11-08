import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch  } from '../store/store';
import { getUserData } from '../store/userSlice';
import style from '../styles/HeaderFooter.module.scss'

export const Footer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const user = useSelector((state: RootState) => state.users.user);

  const [active, setActive] = useState(0); 
  const [finished, setFinished] = useState(0);

  // Загрузка данных пользователя
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  // Подсчет активных и завершенных задач
  useEffect(() => {
    setActive(tasks.filter((task) => task.status === 'backlog').length);
    setFinished(tasks.filter((task) => task.status === 'finished').length);
  }, [tasks]);

  return (
    <div className={style.mainWrap}>
      <div className={style.descriptions}>
        <p>Active tasks: {active}</p>
        <p>Finished tasks: {finished}</p>
      </div>
      <div className={style.descriptions}>
        <p>Kanban board by {user?.name}, {user?.year}</p> 
      </div>        
    </div>
  );
};
