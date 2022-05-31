import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";


@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel', 'A tasty Schnitzel', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg', [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]),
    new Recipe('Big Fat Burger', 'What else you need to say?', 'https://cdn.pixabay.com/photo/2020/10/05/19/55/hamburger-5630646__340.jpg', [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 1)
    ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    //We want to slice to only get the copy of the array and not change the service data 
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}