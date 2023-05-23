import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { state, style, trigger } from '@angular/animations';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountTotalWorkService } from '../../../shared/services/count-total-work.service';
import { DisplayColumn, SubjectInfo, TermPlan } from '@common/ep-models';
import { getTotalSubjectClassWork, getTotalSubjectHours, getTotalSubjectLabs, getTotalSubjectLectures, getTotalSubjectPractics, getTotalSubjectSelfWork } from "@common/utils";

@Component({
  selector: 'lk-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
    ]),
  ],
})
export class TableComponent implements OnInit {
  @Input() displayedColumns!: DisplayColumn[];
  @Input() set dataSource(value: TermPlan) {
    this._dataSource = value;
  };

  get dataSource(): TermPlan {
    return this._dataSource;
  }

  private _dataSource!: TermPlan;
  columnsToDisplayWithExpand!: string[];
  expandedElement!: SubjectInfo | null;

  isEditMode = false;
  editRowIndex!: number | undefined;

  formArr!: FormArray;

  customPatterns = {
    o: { pattern: /^[1-4]$/ },
    f: { pattern: /^[1-8]$/ }
  };

  constructor(
    private fb: FormBuilder,
    private countTotalWorkService: CountTotalWorkService
  ) {}
 
  ngOnInit() {
    this.formArr = this.initForm();
    this.columnsToDisplayWithExpand = [...this.displayedColumns.map(col => col.key), 'edit', 'delete', 'expand'];
  }

  private initForm(): FormArray {
    // from [{ key: value }] to [FormGroup({ key: FormControl(value) })]
    const formArray = this.dataSource.map(
      row => this.fb.group(
        Object.entries(row).reduce((prev, curr) => {
          return {...prev, [curr[0]]: this.fb.control(curr[1], [Validators.required]) }  
        }, {})
      )
    );

    const formArrayResult = this.fb.array(formArray);
    formArrayResult.disable()

    return formArrayResult;
  }

  // private listenToFormChange(formArr: FormArray) {
  //   const COEF = 8;

  //   formArr.controls.forEach((v: AbstractControl, i) => {
  //     const formGroup = v as FormGroup;
  //     const practicalControl = formGroup.get('practical');
  //     const lecturesControl = formGroup.get('lectures');
  //     const labsControl = formGroup.get('labs');

  //     formGroup.get('practical1')?.valueChanges.subscribe(val => {
  //       practicalControl?.setValue((val + formGroup.value.practical2) * COEF);
  //     });

  //     formGroup.get('practical2')?.valueChanges.subscribe(val => {
  //       practicalControl?.setValue((val + formGroup.value.practical1) * COEF);
  //     });

  //     formGroup.get('lectures1')?.valueChanges.subscribe(val => {
  //       lecturesControl?.setValue((val + formGroup.value.lectures2) * COEF);
  //     });

  //     formGroup.get('lectures2')?.valueChanges.subscribe(val => {
  //       lecturesControl?.setValue((val + formGroup.value.lectures1) * COEF);
  //     });

  //     formGroup.get('labs1')?.valueChanges.subscribe(val => {
  //       labsControl?.setValue((val + formGroup.value.labs2) * COEF);
  //     });

  //     formGroup.get('labs2')?.valueChanges.subscribe(val => {
  //       labsControl?.setValue((val + formGroup.value.labs1) * COEF);
  //     });


  //     // console.table(formGroup.value);
  //   })
  // }

  onEdit(el: SubjectInfo, rowIndex: number): void {
    if (!this.isEditMode) {
      this.switchEditMode(true, rowIndex, el);

      return;
    }

    if (this.editRowIndex !== undefined) {
      this.switchEditMode(true, rowIndex, el);
      this.disableOtherRows(rowIndex);
    }
  }

  private switchEditMode(value: boolean, rowIndex: number, el: SubjectInfo | null = null) {
    this.isEditMode = value;

    if (value) {
      this.editRowIndex = rowIndex;
      this.formArr.controls[rowIndex]?.enable();
      this.expandedElement = el;
    } else {
      this.editRowIndex = undefined;
      this.formArr.controls[rowIndex]?.disable();
      this.expandedElement = null;
    }
  }

  onSaveRow(rowIndex: number) {
    this.switchEditMode(false, rowIndex);

    const formGroup = this.formArr.at(rowIndex) as FormGroup;
    const subject = formGroup.value as SubjectInfo;

    const newValue: Partial<SubjectInfo> = {
      lectures: getTotalSubjectLectures(subject),
      practical: getTotalSubjectPractics(subject),
      labs: getTotalSubjectLabs(subject),
      selfWork: getTotalSubjectSelfWork(subject),
      classHours: getTotalSubjectClassWork(subject),
      totalHours: getTotalSubjectHours(subject)
    }

    this.formArr.at(rowIndex).patchValue(newValue);

    this.dataSource = this.formArr.value;
  }

  onCancel(rowIndex: number) {
    this.switchEditMode(false, rowIndex);
    this.formArr = this.initForm();
  }

  onDelete(rowIndex: number) {
    const tmpArr = [...this.dataSource];
    tmpArr.splice(rowIndex, 1)
    this.dataSource = tmpArr;
    this.formArr = this.initForm();
  }

  onRowClick(el: SubjectInfo) {
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
