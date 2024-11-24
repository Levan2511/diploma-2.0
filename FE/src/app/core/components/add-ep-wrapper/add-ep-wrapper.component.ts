import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EducationPlan, TermPlan } from '../../../../../../libs/models/education-plan';
import { displayedColumns } from '../../../shared/constants/key-value-ep';

@Component({
  selector: 'lk-add-ep-wrapper',
  templateUrl: './add-ep-wrapper.component.html',
  styleUrls: ['./add-ep-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEpWrapperComponent implements OnInit {
  keyLabelMap = displayedColumns;

  getLabelByKey(key: string) {
    return this.keyLabelMap.find((item) => item.key === key)?.name;
  }

  createEpForm = this.fb.array<TermPlan>([
    [{
      cycle: 0,
      term: 0,
      name: '',
      department: '',
      lectures: 0,
      exam: 'exam',
      lectures1: 0,
      lectures2: 0,
      labs: 0,
      labs1: 0,
      labs2: 0,
      practical: 0,
      practical1: 0,
      practical2: 0,
      classHours: 0,
      selfWork: 0,
      totalHours: 0,
      credits: 0,
      RGR: 'RGR'
    }]
  ])

  initalControlNames = Object.keys(this.createEpForm.value[0] || {})

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
