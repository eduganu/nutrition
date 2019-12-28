import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute } from '@angular/router';
import { FoodDetailed } from 'src/app/models/food-detailed';
import { FoodNutrient } from 'src/app/models/food-nutrient';
import {Chart} from 'chart.js'
import { NutrientsLabel } from 'src/app/models/nutrientsLabel';
import { NutrientReference } from 'src/app/models/nutrient-reference';
import { UserService } from 'src/app/services/user.service';
import {MenuItem} from 'primeng/api';
import { RadarChartParams } from 'src/app/models/radar-chart-params';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})


export class FoodDetailsComponent implements OnInit {

  items:MenuItem[];
  

  nutrientReference:NutrientReference = new NutrientReference();

  foodDetailed:FoodDetailed;
  foodNutrients:FoodNutrient[];
  nutrientsLabel:FoodNutrient[] = [];
  originalNutrientsLabel:NutrientsLabel;// = new NutrientsLabel();
  updatedNutrientsLabel:NutrientsLabel;
  labelList:any[] = [];
  amount:number = 100;
  chartValues:number[] = [];

  @ViewChild("radarCanvas",{static:true}) radarCanvas: ElementRef;
  
  private radarChart: Chart;
  
  /*private parametros = {
    type: "radar",
    data: {
      labels: ["Energy", "Carbohydrate", "Total Fat", "Saturated Fat", "Sugars", "Salt", "Protein"],
      datasets:[{
        label:"Relative to daily Percentage",
        data: [],
        backgroundColor: 'rgb(30, 130, 140, 0.2)',
        borderColor: 'rgb(30, 130, 140, 0.8)'
      }],
    },
    options: {
      scale: {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
    }
  }*/


  constructor(private foodService:FoodService,
              private activatedRoute:ActivatedRoute,
              private userService:UserService) { }

  ngOnInit() {

    this.items = [
         {label:"Desayuno", icon:'pi pi-plus-circle', command: (event) => {console.log(event); this.addFood("desayuno")}},
         {label:"Comida", icon:'pi pi-plus-circle', command: (event) => {console.log(event); this.addFood("comida")}},
         {label:"Merienda", icon:'pi pi-plus-circle', command: (event) => {console.log(event); this.addFood("merienda")}},
         {label:"Cena", icon:'pi pi-plus-circle', command: (event) => {console.log(event); this.addFood("cena")}},
       ]


    this.activatedRoute.params.subscribe(x => {
      console.log("Pased object:")
      console.log(x)
      this.foodService.getDetails(Number(x.fdcId)).subscribe(datos => {

        this.foodDetailed = datos;
        this.foodNutrients = this.foodDetailed.foodNutrients;
        this.userService.addFoodDetailedHist(this.foodDetailed);

        console.log(this.foodDetailed);

        //this.mapNutrientsLabel(); //aixo s'hauria de poder fer dins d'un servei
        this.originalNutrientsLabel = this.foodService.mapNutrientsLabel(this.foodNutrients)
        this.updateValues();


        this.labelList = Object.entries(this.updatedNutrientsLabel);
        //this.calculatePercentage();
        this.initGraph();

        console.log(this.updatedNutrientsLabel)
        console.log(this.nutrientReference)
        console.log(Object.keys(this.nutrientReference))
      })
      
    })
  }

  initGraph(){
    let radarParams = new RadarChartParams()
    radarParams.data.datasets[0].data = this.chartValues;
    this.radarChart = new Chart(this.radarCanvas.nativeElement, radarParams);
    //this.parametros.data.datasets[0].data = this.chartValues;
    //this.radarChart = new Chart(this.radarCanvas.nativeElement, this.parametros);
  }


  updateValues(){
    this.updatedNutrientsLabel = this.foodService.updateNutrientsValues(this.originalNutrientsLabel, this.amount)
    //this.calculatePercentage();
    this.chartValues = this.foodService.calculatePercentage(this.updatedNutrientsLabel)
    this.initGraph();
  }


  addFood(meal:string){
    console.log("Agregamos comida" + meal)
    this.userService.addFoodToUser(new Date(),meal,this.foodDetailed)
    console.log(this.userService.userFoodSelections)
  }

}
