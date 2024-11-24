import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectInfo } from '../../../../../../libs/models/education-plan';

@Directive()
export abstract class AddSubjectAbstract {

  form: FormGroup = this.initAddSubjectForm();
  
  customPatterns = {
    o: { pattern: /^[1-4]$/ },
    f: { pattern: /^[1-8]$/ }
  };

  constructor(
    protected fb: FormBuilder,
  ) { }

  abstract addSubject(): void;

  private initAddSubjectForm(): FormGroup {
    const controlNames = [
      'RGR', 'credits', 'cycle', 'department', 'exam', 'labs1', 'labs2', 'lectures1', 'lectures2',
      'name', 'practical1', 'practical2', 'term'
    ] as Partial<keyof SubjectInfo>[];

    const controls = controlNames.reduce((prev, curr) => {
      return {...prev, [curr]: this.fb.control(null, [Validators.required])}
    }, {});

    return this.fb.group(controls);
  }
}
