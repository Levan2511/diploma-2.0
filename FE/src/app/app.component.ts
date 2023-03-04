import { Observable } from 'rxjs';
import { ProgressBarService } from './core/services/progress-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showProgressBar$!: Observable<boolean>;

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit() {
    this.showProgressBar$ = this.progressBarService.showProgressBar$;
  }
}
