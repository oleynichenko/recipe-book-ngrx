import {Action} from '@ngrx/store';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState = {
  token: null,
  authenticated: false
};

export function AuthReducers(state = initialState, action: Action) {
  return state;
}
