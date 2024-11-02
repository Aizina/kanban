import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { changeDescription } from '../store/taskSlice'; 


export const TaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === parseInt(id || '0'))
  );
  
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    if (task) {
      setDescription(task.description);
    }
  }, [task]);

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSaveClick = () => {
    if (description.trim() !== '') {
      dispatch(changeDescription({ id: task.id, description })); 
    }
    setIsEditing(false); 
  };

 
  const handleEditClick = () => {
    setIsEditing(true); 
  };

  return (
    <div>
      <h2>{task.name}</h2>
      <p>Status: {task.status}</p>
      <div>
        <p>Description:</p>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={description} 
              onChange={handleDescriptionChange} 
              autoFocus
              style={{ width: '100%', padding: '5px', fontSize: '16px' }}
            />
            <button onClick={handleSaveClick} style={{ marginTop: '10px' }}>
              Save
            </button>
          </div>
        ) : (
          <p onClick={handleEditClick} style={{ cursor: 'pointer', padding: '5px', border: '1px solid #ccc' }}>
            {description || 'This task has no description'}
          </p>
        )}
      </div>
    </div>
  );
};
