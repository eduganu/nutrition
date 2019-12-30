import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodSearchComponent } from './components/food/food-search/food-search.component';
import { FoodDetailsComponent } from './components/food/food-details/food-details.component';
import { UserFoodsComponent } from './components/user/user-foods/user-foods.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';


const routes: Routes = [ 
  {path:'', redirectTo:'', pathMatch: 'full'},
  {path:'searchFood', component: FoodSearchComponent},
  {path:'details/:fdcId', component: FoodDetailsComponent},
  {path:'user/foods', component: UserFoodsComponent},
  {path: 'user/profile', component: UserProfileComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
