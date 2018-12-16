import {Subject} from 'rxjs';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // @ts-ignore
  private recipes: Recipe[] = [
    new Recipe(
      'Mexican Burger',
      'Juicy beef mexican cheeseburgers served with homemade, creamy guacamole and fresh pico de gallo is the ultimate weekend treat and perfect for serving a crowd.',
      'https://images.matprat.no/z74n564tu4-jumbotron/xsmall',
      [
        new Ingredient('Beef mince', 1),
        new Ingredient('Ground coriander', 2),
        new Ingredient('Ground coriander', 3),
      ]
    ),
    new Recipe(
      'Sugar Potato',
      'Cinnamon sugar sweet potato fries with caramel dipping sauce',
      'https://cdn.bluefoot.com/starvin/images/Sweet-Potato-Fries/sweet-potato-caramel-drizzle.png',
      [
        new Ingredient('Salt', 2),
        new Ingredient('Potatoes', 1),
        new Ingredient('Sunflower oil', 3),
      ]
    )
  ];

  constructor() {}

  setRecipes(recipes) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
