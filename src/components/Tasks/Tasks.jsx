import { useResize } from '../../Hooks/useResize';
import Header from '../Header/Header';
import TaskForm from '../TaskForm/TraskForm';
import Task from './Task/Task';
import './Tasks.styles.css';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  getTasks,
  editTaskStatus,
  deleteTask,
} from '../../store/actions/tasksActions';

import { useSelector, useDispatch } from 'react-redux';

const Tasks = () => {
  const { isPhone } = useResize();
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [taskFromWho, setTaskFromWho] = useState('ALL');
  const [filters, setFilters] = useState({
    status: 'ALL',
    importance: 'ALL',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState();

  const dispatch = useDispatch();
  const { REACT_APP_API_URL } = process.env;

  const handleEditCardStatus = (data) => dispatch(editTaskStatus(data));
  const handleDelete = (id) => dispatch(deleteTask(id));
  const renderAllCards = () => {
    return renderList?.map((data, index) => (
      <Task
        key={data._id}
        data={data}
        deleteCard={handleDelete}
        editCardStatus={handleEditCardStatus}
      />
    ));
  };

  const renderCards = (status) => {
    return renderList
      ?.filter((data) => data.status === status)
      .map((data, index) => (
        <Task
          key={data._id}
          data={data}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      ));
  };

  useEffect(() => {
    filterResults();
  }, [filters]);

  useEffect(() => {
    if (search) {
      setRenderList(list.filter((data) => data.title.includes(search)));
    } else {
      setRenderList(list);
    }
  }, [search]);

  const filterResults = () => {
    if (renderList) {
      if (filters.importance === 'ALL' && filters.status === 'ALL') {
        return setRenderList(list);
      }
      if (filters.status === 'ALL') {
        return setRenderList(
          list.filter((data) => data.importance === filters.importance)
        );
      }
      if (filters.importance === 'ALL') {
        return setRenderList(
          list.filter((data) => data.status === filters.status)
        );
      }
      return setRenderList(
        list.filter(
          (data) =>
            data.status === filters.status &&
            data.importance === filters.importance
        )
      );
    }
  };
  const handleFilter = (e) => {
    let { name, value } = e.currentTarget;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };
  useEffect(() => {
    dispatch(getTasks(taskFromWho === 'ME' ? '/me' : ''));
  }, [taskFromWho, dispatch]);

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);
  return (
    <>
      {loading && <div>Cargando</div>}
      <Header />
      <main>
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          <div className="filters">
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="ALL"
                onChange={(e) => {
                  setTaskFromWho(e.currentTarget.value);
                  setFilters({ status: 'ALL', importance: 'ALL' });
                }}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <div className="search">
              <input
                type="text"
                placeholder="Buscar por titulo..."
                onChange={handleSearch}
              />
            </div>
            <label htmlFor="importance">Filtrar por importancia:</label>
            <select
              name="importance"
              onChange={handleFilter}
              onBlur={handleFilter}
              value={filters.importance}
            >
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            <br />
            <label htmlFor="status"> Filtrar por estado:</label>
            <select
              name="status"
              onChange={handleFilter}
              onBlur={handleFilter}
              value={filters.status}
            >
              <option value="ALL">Todas</option>
              <option value="NEW">Nuevo</option>
              <option value="IN PROGRESS">En proceso</option>
              <option value="FINISHED">Terminada</option>
            </select>
          </div>
          {isPhone ? (
            // Render Phone
            !renderList?.length ? (
              <div>No hay tareas creadas</div>
            ) : isLoading ? (
              <SkeletonTheme
                baseColor="#898989"
                highlightColor="#999"
                borderRadius="10px"
              >
                <Skeleton className="skeleton" count={4} />
              </SkeletonTheme>
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : // Render Desktop
          !renderList?.length ? (
            <div>No hay tareas creadas</div>
          ) : (
            <div className="list_group">
              <div className="list desk">
                <h3>Nuevas</h3>
                {isLoading ? (
                  <SkeletonTheme
                    baseColor="#898989"
                    highlightColor="#999"
                    borderRadius="10px"
                    width={'100%'}
                  >
                    <Skeleton className="skeleton" count={4} />
                  </SkeletonTheme>
                ) : (
                  <div className="list ">{renderCards('NEW')}</div>
                )}
              </div>
              <div className="list desk">
                <h3>En proceso</h3>
                {isLoading ? (
                  <SkeletonTheme
                    baseColor="#898989"
                    highlightColor="#999"
                    borderRadius="10px"
                    width={'100%'}
                  >
                    <Skeleton className="skeleton" count={4} />
                  </SkeletonTheme>
                ) : (
                  <div className="list ">{renderCards('IN PROGRESS')}</div>
                )}
              </div>
              <div className="list desk">
                <h3>Terminadas</h3>
                {isLoading ? (
                  <SkeletonTheme
                    baseColor="#898989"
                    highlightColor="#999"
                    borderRadius="10px"
                    width={'100%'}
                  >
                    <Skeleton className="skeleton" count={4} />
                  </SkeletonTheme>
                ) : (
                  <div className="list ">{renderCards('FINISHED')}</div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Tasks;