import { MaterialModule } from './../material/material.module';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchEpComponent } from './components/search-ep/search-ep.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    LoginComponent,
    SearchEpComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    SearchEpComponent
  ]
})
export class SharedModule { }
