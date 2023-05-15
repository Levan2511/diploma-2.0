import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { educationPlan, educationPlanForTerm, tableColumns } from 'src/app/shared/components/table/table-data';
import { ViewEpService } from '../../services/view-ep.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, finalize, switchMap, tap, map } from 'rxjs';
import { EducationPlan } from '../../models/education-plan';
import { isEmpty } from 'lodash';

@Component({
  selector: 'lk-view-ep',
  templateUrl: './view-ep.component.html',
  styleUrls: ['./view-ep.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewEpComponent implements OnInit {
  displayedColumns = tableColumns;
  educationPlan$: Observable<EducationPlan | null> = this.activatedRoute.queryParams.pipe(
    filter(({ epId }) => !!epId),
    switchMap(({ epId }) => this.viewEpService.getEducationPlanById(epId)),
    map(value => {
      if (isEmpty(value)) {
        return null;
      }
      return value;
    })
  );

  constructor(
    private viewEpService: ViewEpService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

}
