import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'FrontNutrition';
  items:MenuItem[];

  ngOnInit(): void {    
    this.items = [
          
      {label:"Search Food", icon: 'pi pi-search', routerLink:["/searchFood"]}
    ];

  }
}

