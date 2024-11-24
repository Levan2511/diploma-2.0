import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewEpComponent } from './components/view-ep/view-ep.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotalTermTableComponent } from './components/total-term-table/total-term-table.component';
import { GetFormGroupPipe } from '../shared/pipes/get-form-group.pipe';
import { TableComponent } from './components/table/table.component';
import { AddSubjectDialogComponent } from './components/add-subject-dialog/add-subject-dialog.component';
import { CancelRemovalBarComponent } from './components/cancel-removal-bar/cancel-removal-bar.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AddSubjectFormComponent } from './components/add-subject-form/add-subject-form.component';



@NgModule({
  declarations: [
    ViewEpComponent,
    TotalTermTableComponent,
    TableComponent,
    GetFormGroupPipe,
    AddSubjectDialogComponent,
    CancelRemovalBarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    NgxMaskDirective,
    AddSubjectFormComponent
  ],
  providers: [provideNgxMask()],
  exports: [
    ViewEpComponent,
  ],
})
export class ViewEpModule { }
