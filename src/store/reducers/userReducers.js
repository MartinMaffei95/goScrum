import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from '../types';

const initialState = {
  userName: 'tin',
  teamID: 'teamID',
  theme_color: 'primary',
  loading: false,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_SUCCESS:
      return {
        loading: false,
        error: '',
        theme_color: action.payload,
      };

    case USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
        theme_color: 'primary',
      };
    default:
      return state;
  }
};
