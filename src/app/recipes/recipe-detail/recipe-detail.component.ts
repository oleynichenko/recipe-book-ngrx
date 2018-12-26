import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as ShActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params.id;
        this.recipeState = this.store.select('recipes');
      });
  }

  sendToShoppingList() {
    this.store.select('recipes').pipe(take(1))
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new fromRecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
}
