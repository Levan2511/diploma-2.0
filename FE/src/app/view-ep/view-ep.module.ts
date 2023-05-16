import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewEpComponent } from './components/view-ep/view-ep.component';
import { SearchEpComponent } from './components/search-ep/search-ep.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ViewEpComponent,
    SearchEpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ViewEpComponent,
    SearchEpComponent
  ]
})
export class ViewEpModule { }
