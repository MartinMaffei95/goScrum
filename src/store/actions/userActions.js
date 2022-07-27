import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from '../types';
const { REACT_APP_API_URL } = process.env;

export const userRequest = () => ({ type: USER_REQUEST });
export const userSuccess = (data) => ({ type: USER_SUCCESS, payload: data });
export const userFailure = (error) => ({
  type: USER_FAILURE,
  payload: error,
});

export const getUserConfig = (config) => (dispatch) => {
  console.log(config);
  //   dispatch(userRequest);
  //   dispatch(userSuccess({ theme_color: 'secondary' }));
};
