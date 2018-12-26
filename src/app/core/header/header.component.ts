import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as authAction from '../../auth/store/auth.actions';
import * as fromRecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromRecipe.FeatureState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new fromRecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new fromRecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new authAction.Logout());
  }
}
