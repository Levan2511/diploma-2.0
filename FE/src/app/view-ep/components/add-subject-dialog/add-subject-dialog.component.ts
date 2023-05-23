import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectInfo } from '@common/ep-models';

@Component({
  selector: 'lk-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSubjectDialogComponent implements OnInit {
  form: FormGroup = this.initAddSubjectForm();
  
  customPatterns = {
    o: { pattern: /^[1-4]$/ },
    f: { pattern: /^[1-8]$/ }
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSubjectDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  addSubject() {
    this.dialogRef.close(this.form.value);
  }

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
