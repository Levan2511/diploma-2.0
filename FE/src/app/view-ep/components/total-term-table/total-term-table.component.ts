import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lk-total-term-table',
  templateUrl: './total-term-table.component.html',
  styleUrls: ['./total-term-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalTermTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
