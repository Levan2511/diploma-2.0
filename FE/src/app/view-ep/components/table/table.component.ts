import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { state, style, trigger } from '@angular/animations';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountTotalWorkService } from '../../../shared/services/count-total-work.service';
import { DisplayColumn, SubjectInfo, TermPlan } from '@common/ep-models';
import { getTotalSubjectClassWork, getTotalSubjectHours, getTotalSubjectLabs, getTotalSubjectLectures, getTotalSubjectPractics, getTotalSubjectSelfWork } from "@common/utils";
import { MatDialog } from '@angular/material/dialog';
import { AddSubjectDialogComponent } from '../add-subject-dialog/add-subject-dialog.component';
import { filter, first } from 'rxjs';
import { TermChagedEvent } from '../../models/ep';
import { isInteger } from 'lodash';

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
export class TableComponent implements OnInit, OnChanges {
  @Output() dataChangedEvent = new EventEmitter<TermChagedEvent>();

  @Input() displayedColumns!: DisplayColumn[];
  @Input() termId!: number;
  @Input() set dataSource(value: TermPlan) {
    this._dataSource = value;

    if (isInteger(this.termId)) {
      this.setTotalTermData(this.termId, value);
    }
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
    private countTotalWorkService: CountTotalWorkService,
    public dialog: MatDialog
  ) {}

  ngOnChanges() {
    if (this.dataSource && isInteger(this.termId)) {
      this.setTotalTermData(this.termId, this.dataSource);
    }
  }
 
  ngOnInit() {
    this.formArr = this.initForm();
    this.columnsToDisplayWithExpand = [...this.displayedColumns.map(col => col.key), 'edit', 'delete', 'expand'];
  }

  showAddSubjectDialog() {
    const dialog = this.dialog.open(AddSubjectDialogComponent, {
      width: '80vw',
      maxWidth: '500px',
    });

    dialog.afterClosed().pipe(
      filter(Boolean)
    ).subscribe(subject => this.insertSubject(subject));
  }

  private insertSubject(subject: SubjectInfo) {
    const newSubject = {
      ...subject,
      lectures: getTotalSubjectLectures(subject),
      practical: getTotalSubjectPractics(subject),
      labs: getTotalSubjectLabs(subject),
      selfWork: getTotalSubjectSelfWork(subject),
      classHours: getTotalSubjectClassWork(subject),
      totalHours: getTotalSubjectHours(subject)
    };
    const tmpArr = [...this.dataSource];
    tmpArr.push(newSubject);

    this.dataSource = tmpArr;
    this.formArr = this.initForm();
    this.dataChangedEvent.emit({ index: this.termId, data: this.dataSource });
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
    this.dataChangedEvent.emit({ index: this.termId, data: this.dataSource });
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
    this.dataChangedEvent.emit({ index: this.termId, data: this.dataSource });
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

  private setTotalTermData(termId: number, plan: TermPlan) {
    this.countTotalWorkService.setData({ [termId]: plan });
  }
}
