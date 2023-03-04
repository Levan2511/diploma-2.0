import { tap, catchError, of } from 'rxjs';
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

  get(
    url: string,
    opts: { [key: string]: any },
    showToastr = true
    ) {
    return this.http.get(url, opts).pipe(
      tap(() => showToastr && this.toastr.success(this.toastrConfig.successMsg)),
      catchError((err) => {
        this.toastr.error(err.message || this.toastrConfig.errorMsg);
        return of(new Error(err));
      })
    );
  }
  
  post(
    url: string,
    body: any,
    opts: { [key: string]: any },
    showToastr = true
    ) {
    return this.http.post(url, body, opts).pipe(
      tap(() => showToastr && this.toastr.success(this.toastrConfig.successMsg)),
      catchError((err) => {
        this.toastr.error(err.message || this.toastrConfig.errorMsg);
        return of(new Error(err));
      })
    );
  }
}
