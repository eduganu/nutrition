import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-foods',
  templateUrl: './user-foods.component.html',
  styleUrls: ['./user-foods.component.css']
})
export class UserFoodsComponent implements OnInit {

  fecha:Date;

  constructor(private userService:UserService) { }

  ngOnInit() {
    console.log(this.userService.userFoodSelections)
  }

}
