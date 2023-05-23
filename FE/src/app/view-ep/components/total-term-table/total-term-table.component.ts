import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DisplayColumnExtended, TermTotal } from '@common/ep-models';
import { columnHeadersMapForExcel } from '../table/table-data';

@Component({
  selector: 'lk-total-term-table',
  templateUrl: './total-term-table.component.html',
  styleUrls: ['./total-term-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalTermTableComponent implements OnInit {
  
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

  dataSource: TermTotal[] = [
    {
      exam: 1,
      test: 1,
      test2: 1,
      RGR: 1,
      RR: 1,
      RK: 1,
      KR: 1,
      KP: 1,
      lectures: 1,
      lectures1: 1,
      lectures2: 1,
      labs: 1,
      labs1: 1,
      labs2: 1,
      practical: 1,
      practical1: 1,
      practical2: 1,
      classHours: 1,
      selfWork: 1,
      totalHours: 1,
      credits: 1,
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.displayColumnStrings = [...this.displayedColumns.map(col => col.key)];
  }

}
