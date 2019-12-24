import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute } from '@angular/router';
import { FoodDetailed } from 'src/app/models/food-detailed';
import { FoodNutrient } from 'src/app/models/food-nutrient';
import {Chart} from 'chart.js'
import { NutrientsLabel } from 'src/app/models/nutrientsLabel';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})


export class FoodDetailsComponent implements OnInit {

  nutrientsOrder = {"Energy":0, "Protein":1, "Carbohydrate, by difference":2, "Sugars, total including NLEA":3, 
                    "Total lipid (fat)":4, "Fatty acids, total saturated":5, "Fatty acids, total trans":6,
                    "Cholesterol":7, "Fiber, total dietary":8,  "Sodium, Na":9, "Calcium, Ca":10};

  foodDetailed:FoodDetailed;
  foodNutrients:FoodNutrient[];
  nutrientsLabel:FoodNutrient[] = [];
  originalNutrientsLabel:NutrientsLabel = new NutrientsLabel();
  updatedNutrientsLabel:NutrientsLabel = new NutrientsLabel();
  labelList:any[] = [];
  amount:number = 100;

  @ViewChild("radarCanvas",{static:true}) radarCanvas: ElementRef;
  
  private radarChart: Chart;
  
  private parametros = {
    type: "radar",
    data: {
      labels: ["Fat", "Saturated Fat", "Trans Fat", "Cholesterol", "Sodium", "Carbohydrates"],
      datasets:[{
        label:"Propiedades",
        data:[20, 10, 6, 15, 5, 7],
        backgroundColor: 'rgb(205, 65, 65, 0.2)',
        borderColor: 'rgb(205, 65, 65, 0.8)'
      }],
    },
    options: {
      scale: {
        angleLines: {
            display: false
        },   
    }
    }
  }


  constructor(private foodService:FoodService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(x => {
      console.log(x)
      console.log('Numero enviado:' + x.fdcId)
      this.foodService.getDetails(Number(x.fdcId)).subscribe(datos => {

        this.foodDetailed = datos;
        this.foodNutrients = this.foodDetailed.foodNutrients;

        console.log(this.foodDetailed);

        this.mapNutrientsLabel(); //aixo s'hauria de poder fer dins d'un servei
        this.updateValues();

        this.labelList = Object.entries(this.updatedNutrientsLabel);
        this.initGraph();
      })
      
    })
  }

  initGraph(){
    this.radarChart = new Chart(this.radarCanvas.nativeElement, this.parametros);
  }

  mapNutrientsLabel(){
    Object.entries(this.originalNutrientsLabel).forEach(([parameter, value]) =>{
         this.foodNutrients.forEach(nutrientInfo => {
           if (value.name === nutrientInfo.nutrient.name){
             if (nutrientInfo.nutrient.unitName !== "kJ"){
               this.originalNutrientsLabel[parameter].value = nutrientInfo.amount;
               this.originalNutrientsLabel[parameter].units = nutrientInfo.nutrient.unitName
             }
            }
          })
    })
    
    console.log(this.originalNutrientsLabel)
  }

  updateValues(){
    if (this.originalNutrientsLabel){
      Object.entries(this.originalNutrientsLabel).forEach(([key, entry]) => {
        this.updatedNutrientsLabel[key].value = Math.round(entry.value * (this.amount / 100))
      })
    }
  }

}
