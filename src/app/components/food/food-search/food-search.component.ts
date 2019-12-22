import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { SearchResult } from 'src/app/models/searchResult';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.css']
})
export class FoodSearchComponent implements OnInit {

  foodName:string;
  resultado:SearchResult;

  constructor(private foodService:FoodService) { }

  ngOnInit() {
  }

  searchName(){
    if (this.foodName.length > 3) {
      this.foodService.search(this.foodName).subscribe(datos => {
        this.resultado = datos
        console.log(this.resultado.foodSearchCriteria)
        //console.log(this.resultado)  
      })
    }
  }

  busqueda() {
    console.log(this.foodName)
    this.foodService.search(this.foodName).subscribe(datos => {
      this.resultado = datos
      console.log(datos)  
      console.log(this.resultado.foodSearchCriteria)
      console.log(this.resultado.foods)

    })

  }

  nextPage() {
    this.foodService.searchNextPage(this.resultado.foodSearchCriteria.generalSearchInput, 
                                    this.resultado.foodSearchCriteria.pageNumber + 1)
                                    .subscribe(datos => {
                                      this.resultado = datos
                                      console.log(this.resultado)
                                    })
  }

}


