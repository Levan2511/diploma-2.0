import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lk-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
