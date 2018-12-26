import {ActionReducerMap} from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export const reducers: ActionReducerMap<AppState> = {
  sh: fromShoppingList.shReducers,
  auth: fromAuth.authReducers
};

export interface AppState {
  sh: fromShoppingList.State;
  auth: fromAuth.State;
}

