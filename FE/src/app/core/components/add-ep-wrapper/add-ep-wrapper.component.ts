import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EducationPlan, TermPlan } from '../../../../../../libs/models/education-plan';
import { displayedColumns } from '../../../shared/constants/key-value-ep';
import { AddSubjectAbstract } from '../../../view-ep/components/add-subject-abstract/add-subject-abstract.component';

@Component({
  selector: 'lk-add-ep-wrapper',
  templateUrl: './add-ep-wrapper.component.html',
  styleUrls: ['./add-ep-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEpWrapperComponent extends AddSubjectAbstract implements OnInit {
  keyLabelMap = displayedColumns;

  getLabelByKey(key: string) {
    return this.keyLabelMap.find((item) => item.key === key)?.name;
  }

  createEpForm = this.fb.array<TermPlan>([
    []
  ])

  initalControlNames = Object.keys(this.createEpForm.value[0] || {})

  constructor(fb: FormBuilder) {
    super(fb)
  }

  override addSubject(): void {
    console.log('Add subject');
  }

  ngOnInit(): void {
  }

}
