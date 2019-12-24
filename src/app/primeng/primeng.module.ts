import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {SpinnerModule} from 'primeng/spinner';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    MenuModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    CardModule,
    SpinnerModule
  ],
  exports:[
    InputTextModule,
    MenuModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    CardModule,
    SpinnerModule
  ]
})
export class PrimengModule { }
