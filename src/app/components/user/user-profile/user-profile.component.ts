import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NutrientReference } from 'src/app/models/nutrient-reference';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService:UserService) { }
  recommendedNutrients:NutrientReference = new NutrientReference();

  ngOnInit() {
    
  }

  resetValue(nutrient:string){
    this.userService.userNutrientsReference[nutrient].value = this.recommendedNutrients[nutrient].value;
  }

}
