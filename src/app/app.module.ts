import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrimengModule } from './primeng/primeng.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FoodSearchComponent } from './components/food/food-search/food-search.component';
import { FoodDetailsComponent } from './components/food/food-details/food-details.component';
import { UserFoodsComponent } from './components/user/user-foods/user-foods.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    FoodSearchComponent,
    FoodDetailsComponent,
    UserFoodsComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
