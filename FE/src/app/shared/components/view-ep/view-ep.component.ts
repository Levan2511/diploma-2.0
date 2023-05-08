import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lk-view-ep',
  templateUrl: './view-ep.component.html',
  styleUrls: ['./view-ep.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewEpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
