import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {Ingredient} from '../../shared/ingredient.model';
import * as fromRecipe from '../store/recipe.reducers';
import * as fromRecipeActions from '../store/recipe.actions';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-added',
  templateUrl: './recipe-added.component.html',
  styleUrls: ['./recipe-added.component.css']
})
export class RecipeAddedComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id !== void 0;

      this.initForm();
    });
  }

  initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .pipe(take(1))
        .subscribe((recipeState) => {
          const recipe = recipeState.recipes[this.id];

          recipeName = recipe.name;
          recipeDescription = recipe.description;
          recipeImagePath = recipe.imagePath;

          recipe.ingredients.forEach((ingredient: Ingredient) => {
            recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            }));
          });
        });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    const recipe = this.recipeForm.value;

    if (this.editMode) {
      this.store.dispatch(new fromRecipeActions.UpdateRecipe({
        id: this.id,
        updatedRecipe: recipe
      }));
    } else {
      this.store.dispatch(new fromRecipeActions.AddRecipe(recipe));
    }

    this.onCancel();
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(i) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}
