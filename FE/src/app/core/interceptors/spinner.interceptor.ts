import { ProgressBarService } from './../services/progress-bar.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private progressBarService: ProgressBarService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.progressBarService.show();

    return next.handle(request).pipe(
      tap(() => {
      }),
      finalize(() => {
        this.progressBarService.hide();
      })
    );
  }
}
