import {Ingredient} from '../../shared/ingredient.model';
import * as shActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 9)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shReducers(state = initialState,
                           action: shActions.shActions) {
  switch (action.type) {
    case shActions.START_EDIT:
      const editedIngredient = state.ingredients[action.payload];

      return {
        ...state,
        editedIngredient,
        editedIngredientIndex: action.payload
      };

    case shActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

      case shActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case shActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case shActions.DELETE_INGREDIENT:
      const ingrs = [...state.ingredients];
      ingrs.splice(state.editedIngredientIndex, 1);

      return {
        ...state,
        ingredients: ingrs,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case shActions.UPDATE_INGREDIENT:
      const updatedIngredient = {
        ...state.ingredients[state.editedIngredientIndex],
        ...action.payload
      };

      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
}
