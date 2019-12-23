export class FoodNutrient {
  
    type: string;
    id: number;
    nutrient: {id: number, 
               number: string, 
               name: string, 
               rank: number,
               unitName: string}
    foodNutrientDerivation: {id: number, 
                            code: string, 
                            description: string, 
                            foodNutrientSource: {id: number,
                                                code: string,
                                                description: string
                                                }
                            };
    amount: number;
}