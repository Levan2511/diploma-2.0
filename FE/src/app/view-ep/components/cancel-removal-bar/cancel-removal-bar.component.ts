import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lk-cancel-removal-bar',
  templateUrl: './cancel-removal-bar.component.html',
  styleUrls: ['./cancel-removal-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancelRemovalBarComponent implements OnInit, OnDestroy {
  @Output() closeEvent = new EventEmitter();
  @Output() cancelRemovalyEvent = new EventEmitter();
  value = 100;
  valueTimer!: NodeJS.Timer;
  secondsLeft = 5;
  secondsTimer!: NodeJS.Timer;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.valueTimer = setInterval(() => {
      if (this.value > -1) {
        this.value--;
        this.cdr.markForCheck();
      }
    }, 50);

    this.secondsTimer = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.cdr.markForCheck();
      } else {
        this.close();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.secondsTimer);
    clearInterval(this.valueTimer);
  }

  close() {
    this.closeEvent.emit();
  }

  cancelRemoval() {
    this.cancelRemovalyEvent.emit();
  }
}
