import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { state, style, trigger } from '@angular/animations';
import { FormArray, FormBuilder } from '@angular/forms';
import { CountTotalWorkService } from '../../services/count-total-work.service';
import { DisplayColumn, SubjectInfo, TermPlan } from '@common/ep-models';

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
          return {...prev, [curr[0]]: this.fb.control(curr[1]) }  
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
