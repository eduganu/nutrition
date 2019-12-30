import { Injectable } from '@angular/core';
import { SearchResult } from '../models/searchResult';
import { FoodDetailed } from '../models/food-detailed';
import { UserSelection } from '../models/user-selection';
import { NutrientReference } from '../models/nutrient-reference';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //availableMeals:string[] = ["desayuno", "comida", "merienda", "cena"];

  searchHist:SearchResult[] = [];
  foodDetailedHist:FoodDetailed[] = [];
  userFoodSelections:UserSelection[] = [];
  userNutrientsReference:NutrientReference = new NutrientReference();

  constructor() { }

  addSearchHist(searchResult:SearchResult) {
    this.searchHist.push(searchResult);
  }

  clearSearchHist(){
    this.searchHist = [];
  }

  addFoodDetailedHist(foodDetailed:FoodDetailed){
    this.foodDetailedHist.push(foodDetailed);
  }

  addFoodToUser(date:Date, meal:string, amount:number, food:FoodDetailed){
    
    let userSelection = new UserSelection();
    userSelection.date = date;
    userSelection.meal = meal;
    userSelection.amount = amount;
    userSelection.food = food;
    
    this.userFoodSelections.push(userSelection);
  }

}
