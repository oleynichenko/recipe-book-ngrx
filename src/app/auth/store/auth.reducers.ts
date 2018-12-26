import * as authActions from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducers(state = initialState, action: authActions.authActions) {

  switch (action.type) {
    case authActions.SIGNIN:
    case authActions.SIGNUP:
      return {
        ...state,
        authenticated: true
      };

    case authActions.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null
      };

    case authActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    default:
      return state;
  }
}
