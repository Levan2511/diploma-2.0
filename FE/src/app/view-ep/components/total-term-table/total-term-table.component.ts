import { map, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { DisplayColumnExtended, TermTotal } from '@common/ep-models';
import { columnHeadersMapForExcel } from '../table/table-data';
import { CountTotalWorkService } from 'src/app/shared/services/count-total-work.service';

@Component({
  selector: 'lk-total-term-table',
  templateUrl: './total-term-table.component.html',
  styleUrls: ['./total-term-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalTermTableComponent implements OnInit {
  @Input() termId!: number;
  
  displayedColumns: DisplayColumnExtended[] = [
    {
      key: 'exam',
      name: 'Іспити',
    },
    {
      key: 'test',
      name: 'Заліки',
    },
    {
      key: 'test2',
      name: 'Диф. Заліки',
    },
    {
      key: 'RGR',
      name: 'РГР',
    },
    {
      key: 'RR',
      name: 'РР',
    },
    {
      key: 'RK',
      name: 'РК',
    },
    {
      key: 'KR',
      name: 'КР',
    },
    {
      key: 'KP',
      name: 'КП',
    },
    {
      key: 'lectures',
      name: columnHeadersMapForExcel.lectures,
    },
    {
      key: 'lectures1',
      name: columnHeadersMapForExcel.lectures1,
    },
    {
      key: 'lectures2',
      name: columnHeadersMapForExcel.lectures2,
    },
    {
      key: 'practical',
      name: columnHeadersMapForExcel.practical,
    },
    {
      key: 'practical1',
      name: columnHeadersMapForExcel.practical1,
    },
    {
      key: 'practical2',
      name: columnHeadersMapForExcel.practical2,
    },
    {
      key: 'labs',
      name: columnHeadersMapForExcel.labs,
    },
    {
      key: 'labs1',
      name: columnHeadersMapForExcel.labs1,
    },
    {
      key: 'labs2',
      name: columnHeadersMapForExcel.labs2,
    },
    {
      key: 'classHours',
      name: columnHeadersMapForExcel.classHours,
    },
    {
      key: 'selfWork',
      name: columnHeadersMapForExcel.selfWork,
    },
    {
      key: 'totalHours',
      name: columnHeadersMapForExcel.totalHours,
    },
    {
      key: 'credits',
      name: columnHeadersMapForExcel.credits,
    },
  ];

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
