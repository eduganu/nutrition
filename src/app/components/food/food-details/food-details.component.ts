import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit {

  constructor(private foodService:FoodService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(x => {
      console.log(x)
      console.log('Numero enviado:' + x.fdcId)
      this.foodService.getDetails(Number(x.fdcId)).subscribe(datos => {
        console.log(datos)
      })
      
    })
  }

}
