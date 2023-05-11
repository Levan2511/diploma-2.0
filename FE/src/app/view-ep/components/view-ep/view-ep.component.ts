import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { educationPlan, educationPlanForTerm, tableColumns } from 'src/app/shared/components/table/table-data';

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

  constructor() { }

  ngOnInit(): void {
  }

}
