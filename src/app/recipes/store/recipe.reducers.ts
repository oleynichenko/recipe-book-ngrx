import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as fromRecipeActions from './recipe.actions';
import {AppState} from '../../store/app.reducers';

export interface FeatureState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
      'https://www.thekitchenwhisperer.net/wp-content/uploads/2017/06/Candied-Sweet-Potato-Wedges2-1200x800.jpg',
      [
        new Ingredient('Salt', 2),
        new Ingredient('Potatoes', 1),
        new Ingredient('Sunflower oil', 3),
      ]
    )
  ]
};

export function recipeReducer (state = initialState, action: fromRecipeActions.RecipeActions) {
  switch (action.type) {
    case fromRecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case fromRecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case fromRecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);

      return {
        ...state,
        recipes: oldRecipes
      };

    case fromRecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.id];
      const updatedRecipes = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];

      recipes[action.payload.id] = updatedRecipes;

      return {
        ...state,
        recipes
      };
  }
  return state;
}
