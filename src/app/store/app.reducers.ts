import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  sh: fromShoppingList.State;
  auth: fromAuth.State;
}
