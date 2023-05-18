import { MaterialModule } from './../material/material.module';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { GetFormGroupPipe } from './pipes/get-form-group.pipe';

@NgModule({
  declarations: [
    LoginComponent,
    TableComponent,
    GetFormGroupPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TableComponent,
  ]
})
export class SharedModule { }
