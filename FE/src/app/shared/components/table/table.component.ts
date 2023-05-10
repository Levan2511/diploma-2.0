

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

  displayedColumns = tableColumns;
  dataSource = [...educationPlan];

  
  columnsToDisplayWithExpand = [...this.displayedColumns.map(col => col.key), 'edit', 'delete', 'expand'];
  expandedElement!: EducationPlanForTerm;


  form: FormGroup = this.fb.group({
    exam: this.fb.control(null),
    RGR: this.fb.control(null),
    credits: this.fb.control(null),
    lectures: this.fb.group({
      lectures1: this.fb.control(null),
      lectures2: this.fb.control(null),
    }),
    practical: this.fb.group({
      practical1: this.fb.control(null),
      practical2: this.fb.control(null),
    }),
  });

  get lecturesFormGroup(): FormGroup {
    return this.form.get('lectures') as FormGroup;
  }

  get practicalFormGroup(): FormGroup {
    return this.form.get('practical') as FormGroup;
  }

  formArr: any;

  constructor(private fb: FormBuilder) {}
 
  ngOnInit() {
    this.formArr = this.getForm();
  }

  getForm(): FormArray {
    // from [{ key: value }] to [{ key: FormControl(value) }]
    const formArray = this.dataSource.map(
      row => Object.entries(row).reduce((prev, curr) => {
        return {...prev, [curr[0]]: this.fb.control(curr[1]) }  
      }, {})
    );

    return this.fb.array(formArray);
  }

  onEdit(el: EducationPlanForTerm) {
    console.log(el);
  }

  onDelete(el: EducationPlanForTerm) {
    console.log('Delete', el);
  }
}
