import { tap, catchError, of, throwError, Observable, finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  toastrConfig = {
    successMsg: 'Успішно!',
    errorMsg: 'Щось пішло не так :('
  }

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private progressBarService: ProgressBarService
  ) { }

  get<T>(
    url: string,
    opts?: { [key: string]: any },
    showToastr = true,
    showProgressBar = true
    ): Observable<T> {
    if (showProgressBar) {
      this.progressBarService.show();
    }
  
    return this.http.get<T>(url, opts).pipe(
      tap(() => showToastr && this.toastr.success(this.toastrConfig.successMsg)),
      finalize(() => this.progressBarService.hide()),
      catchError((err) => {
        if (showToastr) {
          this.toastr.error(err.error.message || this.toastrConfig.errorMsg);
        }
        return of(new Error(err));
      }),
    ) as Observable<T>;
  }
  
  post(
    url: string,
    body: any,
    opts?: { [key: string]: any },
    showToastr = true,
    showProgressBar = true
    ) {
    if (showProgressBar) {
      this.progressBarService.show();
    }

    return this.http.post(url, body, opts).pipe(
      tap((val: any) => showToastr && this.toastr.success(val?.message ?? this.toastrConfig.successMsg)),
      finalize(() => this.progressBarService.hide()),
      catchError((err) => {
        if (showToastr) {
          this.toastr.error(err.error.message || this.toastrConfig.errorMsg);
        }
        return throwError(() => new Error(err));
      })
    );
  }
  
  delete(
    url: string,
    opts?: { [key: string]: any },
    showToastr = true,
    showProgressBar = true
    ) {
    if (showProgressBar) {
      this.progressBarService.show();
    }

    return this.http.delete(url, opts).pipe(
      tap((val: any) => showToastr && this.toastr.success(val?.message ?? this.toastrConfig.successMsg)),
      finalize(() => this.progressBarService.hide()),
      catchError((err) => {
        if (showToastr) {
          this.toastr.error(err.error.message || this.toastrConfig.errorMsg);
        }
        return throwError(() => new Error(err));
      })
    );
  }
}
