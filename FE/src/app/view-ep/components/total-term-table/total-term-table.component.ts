import { map, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { DisplayColumnExtended, TermTotal } from '@common/ep-models';
import { columnHeadersMapForExcel } from '../table/table-data';
import { CountTotalWorkService } from 'src/app/shared/services/count-total-work.service';
import { displayedColumns } from '../../../shared/constants/key-value-ep';

@Component({
  selector: 'lk-total-term-table',
  templateUrl: './total-term-table.component.html',
  styleUrls: ['./total-term-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalTermTableComponent implements OnInit {
  @Input() termId!: number;
  
  displayedColumns: DisplayColumnExtended[] = displayedColumns;

  displayColumnStrings!: string[];

  dataSource$!: Observable<TermTotal[]>;;

  constructor(
    private countTotalWorkService: CountTotalWorkService
  ) { }

  ngOnInit(): void {
    this.displayColumnStrings = [...this.displayedColumns.map(col => col.key)];

    this.dataSource$ = this.countTotalWorkService.getTotalWork$(this.termId).pipe(
      map(value => [value])
    );
  }

}
