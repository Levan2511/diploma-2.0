import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewEpComponent } from './components/view-ep/view-ep.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotalTermTableComponent } from './components/total-term-table/total-term-table.component';
import { GetFormGroupPipe } from '../shared/pipes/get-form-group.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { TableComponent } from './components/table/table.component';
import { AddSubjectDialogComponent } from './components/add-subject-dialog/add-subject-dialog.component';
import { CancelRemovalBarComponent } from './components/cancel-removal-bar/cancel-removal-bar.component';



@NgModule({
  declarations: [
    ViewEpComponent,
    TotalTermTableComponent,
    TableComponent,
    GetFormGroupPipe,
    AddSubjectDialogComponent,
    CancelRemovalBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxSkeletonLoaderModule
  ],
  exports: [
    ViewEpComponent,
  ],
})
export class ViewEpModule { }
