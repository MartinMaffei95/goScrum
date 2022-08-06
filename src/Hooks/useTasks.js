import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
export const useTasks = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    } else {
      setList([]);
      setRenderList([]);
    }
  }, [tasks]);

  return {
    list,
    renderList,
    setRenderList,
  };
};
