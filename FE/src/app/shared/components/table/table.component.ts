

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DisplayColumn, EducationPlanForTerm } from '../../../view-ep/models/education-plan';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { isEqual } from 'lodash';

@Component({
  selector: 'lk-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
    ]),
  ],
})
export class TableComponent implements OnInit {
  @Input() displayedColumns!: DisplayColumn[];
  @Input() dataSource!: EducationPlanForTerm[];
  
  columnsToDisplayWithExpand!: string[];
  expandedElement!: EducationPlanForTerm | null;

  isEditMode = false;
  editRowIndex!: number | undefined;

  formArr!: FormArray;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit() {
    this.formArr = this.initForm();
    this.columnsToDisplayWithExpand = [...this.displayedColumns.map(col => col.key), 'edit', 'delete', 'expand'];
  }

  getFormGroup(index: any): FormGroup {
    return this.formArr.at(index) as FormGroup;
  }

  private initForm(): FormArray {
    // from [{ key: value }] to [FormGroup({ key: FormControl(value) })]
    const formArray = this.dataSource.map(
      row => this.fb.group(
        Object.entries(row).reduce((prev, curr) => {
          return {...prev, [curr[0]]: this.fb.control(curr[1]) }  
        }, {})
      )
    );

    const formArrayResult = this.fb.array(formArray);
    formArrayResult.disable()

    return formArrayResult;
  }

  onEdit(el: EducationPlanForTerm, rowIndex: number): void {
    if (!this.isEditMode) {
      this.switchEditMode(true, rowIndex, el);

      return;
    }

    if (this.editRowIndex !== undefined) {
      this.switchEditMode(true, rowIndex, el);
      this.disableOtherRows(rowIndex);
    }
  }

  private switchEditMode(value: boolean, rowIndex: number, el: EducationPlanForTerm | null = null) {
    this.isEditMode = value;

    if (value) {
      this.editRowIndex = rowIndex;
      this.formArr.controls[rowIndex]?.enable();
      this.expandedElement = el;
    } else {
      this.editRowIndex = undefined;
      this.formArr.controls[rowIndex]?.disable();
      this.expandedElement = null;
    }
  }

  onSaveRow(rowIndex: number) {
    this.switchEditMode(false, rowIndex);

    if (isEqual(this.dataSource, this.formArr.value)) {
      return;
    }
    this.dataSource = this.formArr.value;
  }

  onCancel(rowIndex: number) {
    this.switchEditMode(false, rowIndex);
    this.formArr = this.initForm();
  }

  onDelete(rowIndex: number) {
    const tmpArr = [...this.dataSource];
    tmpArr.splice(rowIndex, 1)
    this.dataSource = tmpArr;
    this.formArr = this.initForm();
  }

  onRowClick(el: EducationPlanForTerm) {
    if (this.isEditMode) {
      return;
    }

    this.expandedElement = this.expandedElement === el ? null : el
  }

  identify(index: number, item: DisplayColumn) {
    return item.key || index;
  }

  private disableOtherRows(rowIndex: number) {
    this.formArr.controls.filter((_, i) => i !== rowIndex).forEach(control => {
      control.disable();
    })
  }
}
