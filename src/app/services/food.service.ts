import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from 'src/app/models/searchResult';
import { FoodNutrient } from '../models/food-nutrient';
import { NutrientsLabel } from '../models/nutrientsLabel';
import { NutrientReference } from '../models/nutrient-reference';
import { UserService } from './user.service';

const apiURL = environment.apiURL
const apiKey = environment.apiKey
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  keyParameter = "api_key=" + apiKey

  nutrientReference:NutrientReference = this.userService.userNutrientsReference;

  constructor(private http:HttpClient,
              private userService:UserService) { }

  search(foodName:string, pageNumber:number=1, dataType:any):Observable<SearchResult>{
    if (pageNumber < 1) {pageNumber = 1};
    let searchExtension = 'generalSearchInput=' + foodName;
    let pageExtension = 'pageNumber=' + pageNumber;
    console.log(apiURL)
    let sendURL = (apiURL + "search?" + this.keyParameter +  "&" + searchExtension + "&" + pageExtension)
    console.log(dataType)
    if (dataType){
      if (dataType.name !== "All") {sendURL += ("&includeDataTypeList=" + dataType.name)}
    }
    console.log(sendURL)
    return this.http.get<SearchResult>(sendURL)
  }

  getDetails(fcdId:number):Observable<any>{
    return this.http.get<any>(apiURL + fcdId + "?" + this.keyParameter )
  }

  mapNutrientsLabel(foodNutrients:FoodNutrient[]):NutrientsLabel{

    let originalNutrientsLabel:NutrientsLabel = new NutrientsLabel();
    
    Object.entries(originalNutrientsLabel).forEach(([parameter, value]) =>{
      //console.log(this.foodNutrients)
         foodNutrients.forEach(nutrientInfo => {
           if (value.name === nutrientInfo.nutrient.name){
             if (nutrientInfo.nutrient.unitName !== "kJ"){
               originalNutrientsLabel[parameter].value = nutrientInfo.amount;
               originalNutrientsLabel[parameter].units = nutrientInfo.nutrient.unitName
             }
            }
          })
    })

    return originalNutrientsLabel
  }

  updateNutrientsValues(originalNutrientsLabel:NutrientsLabel, amount:number):NutrientsLabel{
    let updatedNutrientsLabel:NutrientsLabel = new NutrientsLabel();
    if (originalNutrientsLabel){
      Object.entries(originalNutrientsLabel).forEach(([key, entry]) => {
        updatedNutrientsLabel[key].value = Math.round(entry.value * (amount / 100))
      })
    }

    return updatedNutrientsLabel;
  }

  calculatePercentage(updatedNutrientsLabel:NutrientsLabel):number[]{
    let percentValues:any = {};
    let chartValues:number[] = []
    Object.keys(this.nutrientReference).forEach(key => {
      // afegir un control per conversor d'unitats
      percentValues[key] = Math.round(updatedNutrientsLabel[key].value / this.nutrientReference[key].value * 100);
    })
    return chartValues = Object.values(percentValues);

  }


}
