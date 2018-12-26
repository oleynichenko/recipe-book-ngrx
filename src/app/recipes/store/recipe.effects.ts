import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import * as fromRecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import {Recipe} from '../recipe.model';

@Injectable()
export class RecipeEffects {
  storageUrl = 'https://recipe-1650c.firebaseio.com/recipes.json';
  constructor(private actions$: Actions,
              private store: Store<fromRecipe.FeatureState>,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {}

  @Effect({dispatch: false})
  recipeDelete = this.actions$.pipe(
    ofType(fromRecipeActions.DELETE_RECIPE),
    tap(() => {
      this.router.navigate(['/recipes'], {relativeTo: this.route});
    })
  );

  @Effect()
  recipesFetch = this.actions$.pipe(
    ofType(fromRecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(this.storageUrl);
    }),
    map((recipes) => {
      for (const recipe of recipes) {
        if (!recipe.ingredients) {
          recipe.ingredients = [];
        }
      }

      return {
        type: fromRecipeActions.SET_RECIPES,
        payload: recipes
      };
    }),
  );

  @Effect({dispatch: false})
  recipesStore = this.actions$.pipe(
    ofType(fromRecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      return this.http.put(this.storageUrl, state.recipes, {observe: 'events'});
    })
  );
}
