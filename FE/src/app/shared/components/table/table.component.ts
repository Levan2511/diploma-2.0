

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EducationPlanForTerm } from '../../models/education-plan';
import { educationPlan, tableColumns } from './table-data';
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
  isEditMode = false;

  displayedColumns = tableColumns;
  dataSource = [...educationPlan];

  
  columnsToDisplayWithExpand = [...this.displayedColumns.map(col => col.key), 'edit', 'delete', 'expand'];
  expandedElement!: EducationPlanForTerm;

  formArr!: FormArray;

  constructor(private fb: FormBuilder) {}
 
  ngOnInit() {
    this.formArr = this.getForm();
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

  onEdit(el: EducationPlanForTerm) {
    console.log(el);

    if (this.formArr.enabled) {
      this.formArr.disable();
    } else {
      this.formArr.enable();
    }

    this.isEditMode = !this.isEditMode;
  }

  onDelete(el: EducationPlanForTerm) {
    console.log('Delete', el);
  }
}
