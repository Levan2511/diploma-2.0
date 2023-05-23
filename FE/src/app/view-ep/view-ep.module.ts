import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewEpComponent } from './components/view-ep/view-ep.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotalTermTableComponent } from './components/total-term-table/total-term-table.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    ViewEpComponent,
    TotalTermTableComponent,
    TableComponent
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
  ],
})
export class ViewEpModule { }
