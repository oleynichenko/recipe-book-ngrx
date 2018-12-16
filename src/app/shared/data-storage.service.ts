import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()

export class DataStorageService {
  storageUrl = 'https://recipe-1650c.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes() {
    // const url = this._getUrl();
    const recipes = this.recipeService.getRecipes();

    this.http.put(this.storageUrl, recipes, {observe: 'events'})
      .subscribe((response: HttpEvent<object>) => {
        console.log(response);
      });
  }

  getRecipes() {
    // const url = this._getUrl();

    this.http.get<Recipe[]>(this.storageUrl)
      .pipe(
        map((recipes) => {
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }

  // private _getUrl(): string {
  //   const token = this.authService.getToken();
  //   return this.storageUrl + token;
  // }
}
