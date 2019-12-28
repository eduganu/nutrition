import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { SearchResult } from 'src/app/models/searchResult';
import { Food } from 'src/app/models/food';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.css']
})
export class FoodSearchComponent implements OnInit {

  foodName:string;
  resultado:SearchResult = new SearchResult();
  dataTypeList:any[] = [
                        {name:"Survey (FNDDS)"}, 
                        {name:"Foundation"}, 
                        {name:"Branded"}
                      ]
  dataTypeSelected:any = {name:"All"};

  constructor(private foodService:FoodService,
              private userService:UserService) { }

  ngOnInit() {
    if (this.userService.searchHist.length > 0){
      this.resultado = this.userService.searchHist[this.userService.searchHist.length -1]
      
    }
    
  }

  busqueda() {
    console.log(this.foodName)
    this.foodService.search(this.foodName, 1,this.dataTypeSelected).subscribe(datos => {
      this.resultado = datos
      console.log(datos)
      console.log(this.resultado.foodSearchCriteria)
      console.log(this.resultado.foods)
      this.userService.addSearchHist(this.resultado)
      console.log("historial de busqueda")
      console.log(this.userService.searchHist)
    })

  }

  nextPage() {
    if (this.resultado.currentPage < this.resultado.totalPages) {
      this.foodService.search(this.resultado.foodSearchCriteria.generalSearchInput, 
                                      this.resultado.foodSearchCriteria.pageNumber + 1,
                                      this.dataTypeSelected)
                                      .subscribe(datos => {
                                        this.resultado = datos
                                        this.userService.addSearchHist(this.resultado)
                                      })
    }
  }

  previousPage() {
    if (this.resultado.currentPage > 1) {
      this.foodService.search(this.resultado.foodSearchCriteria.generalSearchInput, 
                                      this.resultado.foodSearchCriteria.pageNumber - 1,
                                      this.dataTypeSelected)
                                      .subscribe(datos => {
                                        this.resultado = datos
                                        this.userService.addSearchHist(this.resultado)
                                      })
    }
  }

  onKeyUp(event) {
    if(event.key === "Enter") {
      this.busqueda();
    }
  }

  selectItem(event:any){
    console.log(event.data)
  } 

  print(){
    console.log(this.dataTypeSelected)
  }
}


