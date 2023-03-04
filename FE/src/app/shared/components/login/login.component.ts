import { HttpService } from './../../../core/services/http.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      uid: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  onSubmit() {
    this.http.get('https://bloomberg-market-and-financial-news.p.rapidapi.com/market/get-price-chart', {
      headers: {
        'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        'X-RapidAPI-Host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
      },
      params: {id: 'inmex:ind', interval: 'y1'},
    }).pipe(
    ).subscribe();
  }
}
