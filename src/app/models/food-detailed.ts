import { FoodNutrient } from './food-nutrient';

export class FoodDetailed{

foodClass: string;
description: string;
foodNutrients: FoodNutrient[];
foodComponents: any[];
foodAttributes: any[];
tableAliasName: string;
brandOwner: string;
gtinUpc: number;
dataSource: string;
ingredients: string;
modifiedDate: Date;
availableDate: Date;
servingSize: number;
servingSizeUnit: string;
householdServingFullText: string;
labelNutrients: {fat: {value:number}, 
                 saturatedFat: {value:number}, 
                 transFat: {value:number}, 
                 cholesterol: {value:number}, 
                 sodium: {value:number},
                 carbohydrates: {vvalue:number},
                 fiber: {value:number},
                 sugars: {value:number},
                 protein: {value:number},
                 calcium: {value:number},
                 iron: {value:number},
                 calories: {value: number}
                }
brandedFoodCategory: string;
fdcId: number;
dataType: string;
publicationDate: Date;
foodPortions: any[];
changes: string;

constructor(){}

}