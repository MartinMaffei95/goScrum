import { useResize } from '../../Hooks/useResize';
import Header from '../Header/Header';
import TaskForm from '../TaskForm/TraskForm';
import Task from './Task/Task';
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
import './GlobalRadio.css';

import { useSelector, useDispatch } from 'react-redux';
import { orange } from '@mui/material/colors';
import { GoTriangleDown } from 'react-icons/go';
import { useTasks } from '../../Hooks/useTasks';
import useSearch from '../../Hooks/useSearch';
import useFilter from '../../Hooks/useFilter';

const Tasks = () => {
  const [viewOn, setViewOn] = useState(false);
  const { isPhone } = useResize();
  const { tasksFetched } = useTasks();
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const { filterList, handleFilter, filters, setFilters } = useFilter(list);

  const [taskFromWho, setTaskFromWho] = useState('ALL');

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleEditCardStatus = (data) => dispatch(editTaskStatus(data));
  const handleDelete = (id) => dispatch(deleteTask(id));

  useEffect(() => {
    if (tasksFetched) {
      setList(tasksFetched);
      setRenderList(tasksFetched);
    } else {
      setList([]);
      setRenderList([]);
    }
  }, [tasksFetched]);

  const renderCards = (status = null) => {
    if (status === null) {
      return renderList?.map((data) => (
        <Task
          key={data._id}
          data={data}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      ));
    } else {
      return renderList
        ?.filter((data) => data.status === status)
        .map((data) => (
          <Task
            key={data._id}
            data={data}
            deleteCard={handleDelete}
            editCardStatus={handleEditCardStatus}
          />
        ));
    }
  };

  useEffect(() => {
    setRenderList(filterList);
  }, [filterList]);

  const { setSearch, handleSearch, searchData } = useSearch(list);
  useEffect(() => {
    setRenderList(searchData);
  }, [searchData]);

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    dispatch(getTasks(taskFromWho === 'ME' ? '/me' : ''));
  }, [taskFromWho, dispatch]);

  const handleView = () => {
    !viewOn ? setViewOn(true) : setViewOn(false);
  };

  return (
    <>
      {loading && (
        <div className="loadingScreen">
          <div className="loadingAnimationText">
            <span className="text animation">Cargando</span>
            <span className="point animation">.</span>
            <span className="point animation">.</span>
            <span className="point animation">.</span>
          </div>
        </div>
      )}

      <Header />
      <main>
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
            <span onClick={handleView} className="button terciary filterBtn">
              Filtrar <GoTriangleDown className="triangle" />
            </span>
          </div>
          <div className={`filters ${viewOn && 'onScreen'}`}>
            <div className=" filterContainer search">
              <label htmlFor="search">Filtrar por Nombre:</label>
              <input
                type="text"
                name="search"
                placeholder="Busquemos algo!"
                onChange={handleSearch}
              />
            </div>
            {isPhone && (
              <>
                <div className="filterContainer">
                  <label htmlFor="importance">Filtrar por importancia:</label>
                  <select
                    name="importance"
                    onChange={handleFilter}
                    // onBlur={handleFilter}
                    value={filters.importance}
                  >
                    <option value="ALL">Todas</option>
                    <option value="LOW">Baja</option>
                    <option value="MEDIUM">Media</option>
                    <option value="HIGH">Alta</option>
                  </select>
                </div>
                <div className="filterContainer">
                  <label htmlFor="status"> Filtrar por estado:</label>
                  <select
                    name="status"
                    onChange={handleFilter}
                    // onBlur={handleFilter}
                    value={filters.status}
                  >
                    <option value="ALL">Todas</option>
                    <option value="NEW">Nuevo</option>
                    <option value="IN PROGRESS">En proceso</option>
                    <option value="FINISHED">Terminada</option>
                  </select>
                </div>
              </>
            )}

            <FormControl className="formControl ">
              <RadioGroup
                className="radio-container"
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
                  control={
                    <Radio
                      color="primary"
                      sx={{
                        color: orange[800],
                        '&.Mui-checked': {
                          color: orange[600],
                        },
                      }}
                    />
                  }
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={
                    <Radio
                      sx={{
                        color: orange[800],
                        '&.Mui-checked': {
                          color: orange[600],
                        },
                      }}
                    />
                  }
                  label="Mis tareas"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {isPhone ? (
            // Render Phone
            !renderList?.length ? (
              <div className="noTasks">No hay tareas creadas</div>
            ) : isLoading ? (
              <SkeletonTheme
                baseColor="#898989"
                highlightColor="#999"
                borderRadius="10px"
              >
                <Skeleton className="skeleton" count={4} />
              </SkeletonTheme>
            ) : (
              <div className="list phone">{renderCards()}</div>
            )
          ) : // Render Desktop
          !renderList?.length ? (
            <div className="noTasks">No hay tareas creadas</div>
          ) : (
            <div className="list_group">
              <div className="list desk">
                <h3 className="desk title">Nuevas</h3>
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
                <h3 className="desk title">En proceso</h3>
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
                <h3 className="desk title">Terminadas</h3>
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
