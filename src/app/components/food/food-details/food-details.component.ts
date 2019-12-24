import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute } from '@angular/router';
import { FoodDetailed } from 'src/app/models/food-detailed';
import { FoodNutrient } from 'src/app/models/food-nutrient';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit {

  foodDetailed:FoodDetailed;
  foodNutrients:FoodNutrient[];

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
        console.log(this.foodDetailed)
        console.log(this.foodNutrients[1])
        console.log(this.foodDetailed.labelNutrients)
        this.initGraph();
      })
      
    })
  }

  initGraph(){
    this.radarChart = new Chart(this.radarCanvas.nativeElement, this.parametros);
  }


}
