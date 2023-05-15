import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { educationPlan, educationPlanForTerm, tableColumns } from 'src/app/shared/components/table/table-data';
import { ViewEpService } from '../../services/view-ep.service';
import { ActivatedRoute } from '@angular/router';
import { filter, finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'lk-view-ep',
  templateUrl: './view-ep.component.html',
  styleUrls: ['./view-ep.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewEpComponent implements OnInit {
  displayedColumns = tableColumns;
  dataSource = educationPlanForTerm;

  educationPlan = educationPlan;

  constructor(
    private viewEpService: ViewEpService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      filter(({ epId }) => !!epId),
      switchMap(({ epId }) => this.viewEpService.getEducationPlanById(epId)),
    ).subscribe(() => this.cdr.markForCheck());

  }

}
