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
  dayChartValues:number[] = [0,0,0,0,0,0,0];

  @ViewChild("radarDayCanvas",{static:true}) radarDayCanvas: ElementRef;
  
  private radarChartDay: Chart;

  constructor(private userService:UserService,
              private foodService:FoodService) { }

  ngOnInit() {
    this.allSelections = this.userService.userFoodSelections;
    //console.log(this.userService.userFoodSelections)

    this.filterByDay();
    console.log("elementos filtrados")
    console.log(this.filteredByDay);

    this.calculateDayChart();
    this.initDayGraph();
  }

  filterByDay(){
    this.filteredByDay = this.allSelections.filter(element => {
      return element.date.getFullYear == this.fecha.getFullYear &&
             element.date.getUTCMonth == this.fecha.getUTCMonth &&
             element.date.getUTCDay == this.fecha.getUTCDay;
    })
  }

  calculateDayChart(){
    let originalMappedList:NutrientsLabel[] = [];
    
    console.log(this.filteredByDay.values()) 
    this.filteredByDay.forEach(element => {
      originalMappedList.push(this.foodService.mapNutrientsLabel(element.food.foodNutrients))
    })
    console.log(originalMappedList)
    originalMappedList.forEach(element => {
      let updatedNutrientsLabel = this.foodService.updateNutrientsValues(element,100);
      let chartValuesTemp = (this.foodService.calculatePercentage(updatedNutrientsLabel));
      chartValuesTemp.map((value,index) => {
        this.dayChartValues[index] += value
      })
    })

    console.log(this.dayChartValues)

  }

  initDayGraph(){
    let radarParams = new RadarChartParams();
    radarParams.data.datasets[0].data = this.dayChartValues;
    this.radarChartDay = new Chart(this.radarDayCanvas.nativeElement, radarParams);
    //this.parametros.data.datasets[0].data = this.chartValues;
    //this.radarChart = new Chart(this.radarCanvas.nativeElement, this.parametros);
  }

}
