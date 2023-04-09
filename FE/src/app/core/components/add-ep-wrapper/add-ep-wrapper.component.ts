import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lk-add-ep-wrapper',
  templateUrl: './add-ep-wrapper.component.html',
  styleUrls: ['./add-ep-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEpWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
