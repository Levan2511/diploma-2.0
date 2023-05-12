

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
      // TODO: after this line formArr value become with 1 value array
      console.log(this.formArr.value);
      Object.values((this.formArr.controls[rowIndex] as FormGroup).controls).forEach(c => c.enable());
      setTimeout(() => {
        console.log(this.formArr.value);
      }, 100);
      this.expandedElement = el;
    } else {
      this.editRowIndex = undefined;
      this.formArr.controls[rowIndex]?.disable();
      this.expandedElement = null;
    }
  }

  onSaveRow(rowIndex: number) {
    this.switchEditMode(false, rowIndex);
    this.dataSource = this.formArr.value;
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

  identify(index: number, item: DisplayColumn) {
    return item.key || index;
  }

  private disableOtherRows(rowIndex: number) {
    this.formArr.controls.filter((_, i) => i !== rowIndex).forEach(control => {
      control.disable();
    })
  }
}
