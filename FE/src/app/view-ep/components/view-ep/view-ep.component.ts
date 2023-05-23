
import { ChangeDetectionStrategy, Component, ChangeDetectorRef, Inject } from '@angular/core';
import { ViewEpService } from '../../services/view-ep.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, switchMap, tap, map } from 'rxjs';
import { isEmpty, isUndefined } from 'lodash';
import { ExcelService } from 'src/app/core/services/excel.service';
import { EXPANSION_PANEL_ANIMATION_TIMING, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, MatExpansionPanelDefaultOptions } from '@angular/material/expansion';
import { EducationPlan, SubjectInfo } from '@common/ep-models';
import { columnHeadersMapForExcel, tableColumns } from '../table/table-data';

@Component({
  selector: 'lk-view-ep',
  templateUrl: './view-ep.component.html',
  styleUrls: ['./view-ep.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
    useValue: {
      expandedHeight: '60px',
      collapsedHeight: '60px'
    }
  }]
})
export class ViewEpComponent {
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

  constructor(
    private viewEpService: ViewEpService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private excelService: ExcelService,
    @Inject(MAT_EXPANSION_PANEL_DEFAULT_OPTIONS) panelOptions: MatExpansionPanelDefaultOptions,
  ) { }

  saveExcel(ep: EducationPlan) {
    const epName = this.activatedRoute.snapshot.queryParamMap.get('epId');

    ep.forEach((cycle, i) => {
      // map to Cyrillic words
      const data = cycle.map((subject) => {
        return Object.entries(subject).reduce((prev, curr) => {
          const oldKey = curr[0] as keyof SubjectInfo;
          return {...prev, [columnHeadersMapForExcel[oldKey]]: curr[1]}
        }, {})
      });

      this.excelService.exportAsExcelFile(data, `${i + 1} Семестр__${epName}`);
    });
  }
}
