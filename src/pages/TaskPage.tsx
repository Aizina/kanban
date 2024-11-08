import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { changeDescription } from '../store/taskSlice'; 
import style from '../styles/TaskPage.module.scss';

export const TaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const taskId = Number(id);
  const task = useAppSelector((state) => state.tasks.tasks.find((task) => task.id === taskId));

  const [description, setDescription] = useState(task?.description || '');
  const [isEditing, setIsEditing] = useState(false);

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSaveClick = () => {
    if (description.trim() && description.trim() !== task.description) {
      dispatch(changeDescription({ id: task.id, description }));
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className={style.taskWrapper}>
      <div className={style.taskIntro}>
        <h2 className={style.taskName}>{task.name}</h2>
        <Link to="/" className={style.closeButton} onClick={handleSaveClick}>&#10005;</Link>
      </div>

      <div className={style.taskDescription}>
        {isEditing ? (
          <div className={style.taskInputWrapper}>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              autoFocus
              className={style.taskInput}
            />
          </div>
        ) : (
          <p onClick={handleEditClick}>
            {description || 'This task has no description'}
          </p>
        )}
      </div>
    </div>
  );
};
