import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from '../types';
const { REACT_APP_API_URL } = process.env;

export const tasksRequest = () => ({ type: TASKS_REQUEST });
export const tasksSuccess = (data) => ({ type: TASKS_SUCCESS, payload: data });
export const tasksFailure = (error) => ({
  type: TASKS_FAILURE,
  payload: error,
});

export const getTasks = (path) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${REACT_APP_API_URL}task${path}`, {
    headers: {
      contentType: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(`${REACT_APP_API_URL}tasks${path}`, data);
      dispatch(tasksSuccess(data.result));
    })
    .catch((error) => {
      dispatch(tasksFailure(error));
    });
};

export const deleteTask = (id) => (dispatch) => {
  fetch(`${REACT_APP_API_URL}task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => res.json())
    .then((data) => dispatch(getTasks('')));
};

export const editTaskStatus = (data) => (dispatch) => {
  // dispatch(tasksRequest());
  const statusArr = ['NEW', 'IN PROGRESS', 'FINISHED'];

  const newStatusIndex =
    statusArr.indexOf(data.status) > 1 ? 0 : statusArr.indexOf(data.status) + 1;
  console.log(data);
  fetch(`${REACT_APP_API_URL}task/${data._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({
      task: {
        title: data.title,
        importance: data.importance,
        status: statusArr[newStatusIndex],
        description: data.description,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => dispatch(getTasks('')));
};
