import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    MenuModule,
    BrowserAnimationsModule,
    ButtonModule
  ],
  exports:[
    InputTextModule,
    MenuModule,
    BrowserAnimationsModule,
    ButtonModule
  ]
})
export class PrimengModule { }
