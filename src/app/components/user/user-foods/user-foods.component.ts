import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserSelection } from 'src/app/models/user-selection';

@Component({
  selector: 'app-user-foods',
  templateUrl: './user-foods.component.html',
  styleUrls: ['./user-foods.component.css']
})
export class UserFoodsComponent implements OnInit {

  fecha:Date = new Date();

  allSelections:UserSelection[];
  filteredByDay:UserSelection[];

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.allSelections = this.userService.userFoodSelections;
    console.log(this.userService.userFoodSelections)

    this.filterByDay();

    console.log(this.filteredByDay);
  }

  filterByDay(){
    this.filteredByDay = this.allSelections.filter(element => {
      return element.date.getUTCFullYear == this.fecha.getFullYear &&
             element.date.getUTCMonth == this.fecha.getUTCMonth &&
             element.date.getUTCDay == this.fecha.getUTCDay;
    })
  }

}
