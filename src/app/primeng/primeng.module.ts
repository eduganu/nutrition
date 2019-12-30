import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {SpinnerModule} from 'primeng/spinner';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DropdownModule} from 'primeng/dropdown';
import {SlideMenuModule} from 'primeng/slidemenu';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SliderModule} from 'primeng/slider';
import {AccordionModule} from 'primeng/accordion';


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
    SpinnerModule,
    KeyFilterModule,
    DropdownModule,
    SlideMenuModule,
    TabViewModule,
    CalendarModule,
    ToggleButtonModule,
    SliderModule,
    AccordionModule
  ],
  exports:[
    InputTextModule,
    MenuModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    CardModule,
    SpinnerModule,
    KeyFilterModule,
    DropdownModule,
    SlideMenuModule,
    TabViewModule,
    CalendarModule,
    ToggleButtonModule,
    SliderModule,
    AccordionModule
  ]
})
export class PrimengModule { }
