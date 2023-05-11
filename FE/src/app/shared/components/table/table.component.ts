

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DisplayColumn, EducationPlanForTerm } from '../../../view-ep/models/education-plan';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lk-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
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
    this.formArr = this.getForm();
    this.columnsToDisplayWithExpand = [...this.displayedColumns.map(col => col.key), 'edit', 'delete', 'expand'];
  }

  getFormGroup(index: any): FormGroup {
    return this.formArr.at(index) as FormGroup;
  }

  private getForm(): FormArray {
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
      this.switchEditMode(true, el, rowIndex);

      return;
    }

    if (this.editRowIndex !== undefined) {
      this.switchEditMode(true, el, rowIndex);
      this.disableOtherRows(rowIndex);
    }
  }

  private switchEditMode(value: boolean, el: EducationPlanForTerm, rowIndex: number) {
    this.isEditMode = value;

    if (value) {
      this.editRowIndex = rowIndex;
      // TODO: after this line formArr value become with 1 value array
      this.formArr.controls[rowIndex].enable();
      this.expandedElement = el;
    } else {
      this.editRowIndex = undefined;
      this.formArr.controls[rowIndex]?.disable();
      this.expandedElement = null;
    }
  }

  onSaveRow(rowIndex: number) {
    console.log('Save changes');
    // this.dataSource[rowIndex] = this.formArr.controls[rowIndex].value;
    // this.isEditMode = false;
    // this.editRowIndex = undefined;
    // this.expandedElement = null;
    // this.cdr.detectChanges();
  }

  onDelete(el: EducationPlanForTerm) {
    console.log('Delete', el);
  }

  onRowClick(el: EducationPlanForTerm) {
    if (this.isEditMode) {
      return;
    }

    this.expandedElement = this.expandedElement === el ? null : el
  }

  private disableOtherRows(rowIndex: number) {
    this.formArr.controls.filter((_, i) => i !== rowIndex).forEach(control => {
      control.disable();
    })
  }
}
