import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { SearchWrapperComponent } from './components/search-wrapper/search-wrapper.component';
import { AddEpWrapperComponent } from './components/add-ep-wrapper/add-ep-wrapper.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SearchWrapperComponent,
    AddEpWrapperComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CoreModule { }
