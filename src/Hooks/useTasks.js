import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
export const useTasks = () => {
  const [tasksFetched, setFasksFetched] = useState(null);

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    if (tasks?.length) {
      setFasksFetched(tasks);
    } else {
      setFasksFetched([]);
    }
  }, [tasks]);

  return {
    tasksFetched,
  };
};
