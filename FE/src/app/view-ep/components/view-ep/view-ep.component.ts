import { columnHeadersMapForExcel } from './../../../shared/components/table/table-data';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { tableColumns } from 'src/app/shared/components/table/table-data';
import { ViewEpService } from '../../services/view-ep.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, finalize, switchMap, tap, map } from 'rxjs';
import { EducationPlan, EducationPlanForTerm } from '../../models/education-plan';
import { isEmpty, isUndefined } from 'lodash';
import { ExcelService } from 'src/app/core/services/excel.service';

@Component({
  selector: 'lk-view-ep',
  templateUrl: './view-ep.component.html',
  styleUrls: ['./view-ep.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewEpComponent implements OnInit {
  searchCompleted = false;

  displayedColumns = tableColumns;
  educationPlan$: Observable<EducationPlan | null> = this.activatedRoute.queryParams.pipe(
    filter(({ epId }) => !!epId),
    tap(() => this.searchCompleted = false),
    switchMap(({ epId }) => this.viewEpService.getEducationPlanById(epId)),
    map(value => {
      this.searchCompleted = true;

      if (isEmpty(value)) {
        return null;
      }
      return value;
    })
  );

  queryParamEmpty$: Observable<boolean> = this.activatedRoute.queryParams.pipe(
    map(({ epId }) => isUndefined(epId) || isEmpty(epId))
  );

  dataChanged!: boolean;

  constructor(
    private viewEpService: ViewEpService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
  }

  saveExcel(ep: EducationPlan) {
    const epName = this.activatedRoute.snapshot.queryParamMap.get('epId');

    // const data = 

    ep.forEach((cycle, i) => {
      // map to Cyrillic words
      const data = cycle.map((subject) => {
        return Object.entries(subject).reduce((prev, curr) => {
          const oldKey = curr[0] as keyof EducationPlanForTerm;
          return {...prev, [columnHeadersMapForExcel[oldKey]]: curr[1]}
        }, {})
      });

      this.excelService.exportAsExcelFile(data, `${i + 1} Семестр__${epName}`);
    });
  }

  onDataChanged(value: boolean) {
    this.dataChanged = value;
  }
}
