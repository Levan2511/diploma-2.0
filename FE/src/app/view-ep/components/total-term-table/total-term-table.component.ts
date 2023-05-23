import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SubjectInfo } from '@common/ep-models';
import { columnHeadersMapForExcel } from '../table/table-data';

interface ExtendedSubjectInfo extends SubjectInfo {
  test: string;
  test2: string;
  RR: string;
  RK: string;
  KR: string;
  KP: string;
}

@Component({
  selector: 'lk-total-term-table',
  templateUrl: './total-term-table.component.html',
  styleUrls: ['./total-term-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalTermTableComponent implements OnInit {
  
  displayedColumns: Partial<Record<keyof ExtendedSubjectInfo, string>>[] = [
    {
      exam: 'Іспити',
      test: 'Заліки',
      test2: 'Диф. Заліки',
      RGR: 'РГР',
      RR: 'РР',
      RK: 'РК',
      KR: 'КР',
      KP: 'КП',
      lectures: columnHeadersMapForExcel.lectures,
      lectures1: columnHeadersMapForExcel.lectures1,
      lectures2: columnHeadersMapForExcel.lectures2,
      practical: columnHeadersMapForExcel.practical,
      practical1: columnHeadersMapForExcel.practical1,
      practical2: columnHeadersMapForExcel.practical2,
      labs: columnHeadersMapForExcel.labs,
      labs1: columnHeadersMapForExcel.labs1,
      labs2: columnHeadersMapForExcel.labs2,
      classHours: columnHeadersMapForExcel.classHours,
      selfWork: columnHeadersMapForExcel.selfWork,
      totalHours: columnHeadersMapForExcel.totalHours,
      credits: columnHeadersMapForExcel.credits
    }
  ];

  dataSource = [];

  constructor() { }

  ngOnInit(): void {
  }

}
