import { combineReducers } from 'redux';
import { tasksReducer } from './tasksReducer';
import { userReducers } from './userReducers';

const rootReducer = combineReducers({
  tasksReducer,
  userReducers,
});

export default rootReducer;
