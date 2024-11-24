import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectInfo } from '@common/ep-models';
import { AddSubjectAbstract } from '../add-subject-abstract/add-subject-abstract.component';

@Component({
  selector: 'lk-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSubjectDialogComponent extends AddSubjectAbstract implements OnInit {

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSubjectDialogComponent>
  ) {
    super(fb)
  }

  ngOnInit(): void {
  }

  addSubject() {
    this.dialogRef.close(this.form.value);
  }
}
