import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { UserSelection } from './models/user-selection';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'FrontNutrition';

  userFoodSelections:UserSelection[] = [];

  constructor(private userService:UserService){}

  ngOnInit(): void {    

  }

  clearHist(){
    console.log(this.userService.userFoodSelections)
    this.userService.clearSearchHist()
    console.log(this.userService.searchHist)
  }
}

