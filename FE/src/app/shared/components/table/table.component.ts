

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EducationPlanForTerm } from '../../models/education-plan';
import { educationPlan, tableColumns } from './table-data';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  
  columnsToDisplayWithExpand = [...this.displayedColumns.map(col => col.key), 'expand'];
  expandedElement: any;


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

  constructor(private fb: FormBuilder) {}
 
  ngOnInit() {
    
  }
}
