import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserSelection } from 'src/app/models/user-selection';
import {Chart} from 'chart.js'
import { FoodService } from 'src/app/services/food.service';
import { NutrientsLabel } from 'src/app/models/nutrientsLabel';
import { RadarChartParams } from 'src/app/models/radar-chart-params';
import { ChartColors } from 'src/app/models/chart-colors';

@Component({
  selector: 'app-user-foods',
  templateUrl: './user-foods.component.html',
  styleUrls: ['./user-foods.component.css']
})
export class UserFoodsComponent implements OnInit {

  fecha:Date = new Date();
  radarParams = new RadarChartParams();
  toogleDay:boolean = true;
  availableChartColors:ChartColors = new ChartColors(); 

  allSelections:UserSelection[];

  filteredByDay:UserSelection[];
  filteredDesayuno:UserSelection[];
  filteredComida:UserSelection[];
  filteredMerienda:UserSelection[];
  filteredCena:UserSelection[];

  dayChartValues:number[] = [];
  desayunoChartValues:number[] = [];
  comidaChartValues:number[] = [];
  meriendaChartValues:number[] = [];
  cenaChartValues:number[] = [];

  @ViewChild("radarDayCanvas",{static:true}) radarDayCanvas: ElementRef;

  
  private radarChartDay: Chart;

  constructor(private userService:UserService,
              private foodService:FoodService) { }

  ngOnInit() {
    this.allSelections = this.userService.userFoodSelections;
    //console.log(this.userService.userFoodSelections)

    this.filterByDay();

    this.filteredDesayuno = this.filterByMeal("desayuno");
    this.filteredComida = this.filterByMeal("comida");
    this.filteredMerienda = this.filterByMeal("merienda");
    this.filteredCena = this.filterByMeal("cena")

    this.dayChartValues = this.calculateChartValues(this.filteredByDay);
    this.initDayGraph(this.dayChartValues);

    this.desayunoChartValues = this.calculateChartValues(this.filteredDesayuno);
    this.comidaChartValues = this.calculateChartValues(this.filteredComida);
    this.meriendaChartValues = this.calculateChartValues(this.filteredMerienda);
    this.cenaChartValues = this.calculateChartValues(this.filteredCena);

  }

  filterByDay(){

    this.filteredByDay = this.allSelections.filter(element => {
      return element.date.getFullYear == this.fecha.getFullYear &&
             element.date.getUTCMonth == this.fecha.getUTCMonth &&
             element.date.getUTCDay == this.fecha.getUTCDay;
    })
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
    let amounts:number[] = []
    let amountsIndex = 0
    console.log("filtered List")
    console.log(filteredList)
    
    //console.log(this.filteredByDay.values()) 
    filteredList.forEach(element => {
      originalMappedList.push(this.foodService.mapNutrientsLabel(element.food.foodNutrients))
      amounts.push(element.amount)
    })

    //console.log(originalMappedList)
    originalMappedList.forEach(element => {
      let updatedNutrientsLabel = this.foodService.updateNutrientsValues(element,amounts[amountsIndex]); //substituir el 100 pel parametre amountIngerit
      amountsIndex++;
      let chartValuesTemp = (this.foodService.calculatePercentage(updatedNutrientsLabel));
      chartValuesTemp.map((value,index) => {
        chartValues[index] += value
      })
    })

    //console.log(chartValues)
    return chartValues
  }

  initDayGraph(chartValues:number[]){
    
    this.radarParams.data.datasets[0].label = "% Total Nutrients Intake"
    this.radarParams.data.datasets[0].data = chartValues;
    this.radarChartDay = new Chart(this.radarDayCanvas.nativeElement, this.radarParams);
  }

  handleChange(event, mealName:string, chartValues:number[]){

    if (event.checked == true){
      this.addDatasetToChart(mealName,chartValues)
    }
    else {
      this.removeDatasetFromChart(mealName)
    }
  }

  addDatasetToChart(mealName:string, chartValues:number[]){

    let datasetParams = new RadarChartParams().data.datasets[0] 
    let color = this.random_rgba()
    
    if (mealName == "Total Nutrients Intake"){
      color = this.availableChartColors.dia
    } else if (Object.keys(this.availableChartColors).includes(mealName)) {
    color = this.availableChartColors[mealName]
    }

    datasetParams.backgroundColor = color + "0.2)";
    datasetParams.borderColor = color + "0.8";

    datasetParams.label = "% " + mealName;
    datasetParams.data = chartValues;

    this.radarParams.data.datasets.push(datasetParams)
    this.radarChartDay.update();
  }

  removeDatasetFromChart(mealName:string){

    this.radarParams.data.datasets.forEach((element,index) => {
      if (("% " + mealName) === element.label) {
        this.radarParams.data.datasets.splice(index,1)
      }
    })

    this.radarChartDay.update();
  }

  random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', ';
  }

}
