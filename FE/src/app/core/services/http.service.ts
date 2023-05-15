import { tap, catchError, of, throwError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  toastrConfig = {
    successMsg: 'Success',
    errorMsg: 'Something went wrong'
  }

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  get<T>(
    url: string,
    opts?: { [key: string]: any },
    showToastr = true
    ): Observable<T> {
    return this.http.get<T>(url, opts).pipe(
      tap(() => showToastr && this.toastr.success(this.toastrConfig.successMsg)),
      catchError((err) => {
        this.toastr.error(err.message || this.toastrConfig.errorMsg);
        return of(new Error(err));
      })
    ) as Observable<T>;
  }
  
  post(
    url: string,
    body: any,
    opts?: { [key: string]: any },
    showToastr = true
    ) {
    return this.http.post(url, body, opts).pipe(
      tap(() => showToastr && this.toastr.success(this.toastrConfig.successMsg)),
      catchError((err) => {
        this.toastr.error(err.error.message || this.toastrConfig.errorMsg);
        return throwError(() => new Error(err));
      })
    );
  }
}
