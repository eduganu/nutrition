import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserSelection } from 'src/app/models/user-selection';
import {Chart} from 'chart.js'
import { FoodNutrient } from 'src/app/models/food-nutrient';
import { FoodService } from 'src/app/services/food.service';
import { NutrientsLabel } from 'src/app/models/nutrientsLabel';
import { RadarChartParams } from 'src/app/models/radar-chart-params';

@Component({
  selector: 'app-user-foods',
  templateUrl: './user-foods.component.html',
  styleUrls: ['./user-foods.component.css']
})
export class UserFoodsComponent implements OnInit {

  fecha:Date = new Date();

  allSelections:UserSelection[];
  
  filteredByDay:UserSelection[];
  filteredDesayuno:UserSelection[];
  filteredComida:UserSelection[];
  filteredMerienda:UserSelection[];
  filteredCena:UserSelection[];

  dayChartValues:number[] = [];
  desayunoChartValues:number[] = [];
  comidaChartValues:number[] = [];

  @ViewChild("radarDayCanvas",{static:true}) radarDayCanvas: ElementRef;
  @ViewChild("radarDesayunoCanvas",{static:true}) radarDesayunoCanvas: ElementRef;
  @ViewChild("radarComidaCanvas",{static:true}) radarComidaCanvas: ElementRef;
  @ViewChild("radarMeriendaCanvas",{static:true}) radarMeriendaCanvas: ElementRef;
  @ViewChild("radarCenaCanvas",{static:true}) radarCenaCanvas: ElementRef;
  
  private radarChartDay: Chart;
  private radarChartDesayuno: Chart;
  private radarChartComida: Chart;
  private radarChartMerienda: Chart;
  private radarChartCena: Chart;

  constructor(private userService:UserService,
              private foodService:FoodService) { }

  ngOnInit() {
    this.allSelections = this.userService.userFoodSelections;
    //console.log(this.userService.userFoodSelections)

    this.filterByDay();
    console.log("elementos filtrados");
    console.log(this.filteredByDay);

    this.filteredDesayuno = this.filterByMeal("desayuno");
    console.log("elementos desayuno");
    console.log(this.filteredDesayuno);

    this.filteredComida = this.filterByMeal("comida");


    this.dayChartValues = this.calculateChartValues(this.filteredByDay);
    this.initDayGraph(this.dayChartValues);

    this.desayunoChartValues = this.calculateChartValues(this.filteredDesayuno);
    this.initDesayunoGraph(this.desayunoChartValues, this.radarDesayunoCanvas);

    this.comidaChartValues = this.calculateChartValues(this.filteredComida);
    this.initComidaGraph(this.comidaChartValues);


  }

  filterByDay(){
    this.filteredByDay = this.allSelections.filter(element => {
      return element.date.getFullYear == this.fecha.getFullYear &&
             element.date.getUTCMonth == this.fecha.getUTCMonth &&
             element.date.getUTCDay == this.fecha.getUTCDay;
    })

    // func calculateMealsChart()
  }

  filterByMeal(meal:string):UserSelection[]{
    let filteredList: UserSelection[];
    filteredList = this.filteredByDay.filter(element => {
      return element.meal == meal;
    })
    return filteredList;
  }

  calculateChartValues(filteredList:UserSelection[]){
    let originalMappedList:NutrientsLabel[] = [];
    let chartValues:number[] = [0,0,0,0,0,0,0];
    
    console.log(this.filteredByDay.values()) 
    filteredList.forEach(element => {
      originalMappedList.push(this.foodService.mapNutrientsLabel(element.food.foodNutrients))
    })

    console.log(originalMappedList)
    originalMappedList.forEach(element => {
      let updatedNutrientsLabel = this.foodService.updateNutrientsValues(element,100);
      let chartValuesTemp = (this.foodService.calculatePercentage(updatedNutrientsLabel));
      chartValuesTemp.map((value,index) => {
        chartValues[index] += value
      })
    })

    console.log(chartValues)
    return chartValues
  }

  initDayGraph(chartValues:number[]){
    let radarParams = new RadarChartParams();
    radarParams.data.datasets[0].data = chartValues;
    this.radarChartDay = new Chart(this.radarDayCanvas.nativeElement, radarParams);
    //this.parametros.data.datasets[0].data = this.chartValues;
    //this.radarChart = new Chart(this.radarCanvas.nativeElement, this.parametros);
  }

  initDesayunoGraph(chartValues:number[], canvas){
    let radarParams = new RadarChartParams();
    radarParams.data.datasets[0].data = chartValues;
    this.radarChartDesayuno = new Chart(canvas.nativeElement, radarParams);
  }

  initComidaGraph(chartValues:number[]){
    let radarParams = new RadarChartParams();
    radarParams.data.datasets[0].data = chartValues;
    this.radarChartComida = new Chart(this.radarComidaCanvas.nativeElement, radarParams);
  }


}
