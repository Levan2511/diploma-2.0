import { HttpService } from './../../../core/services/http.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

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
    private authService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      uid: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  onSubmit() {
    this.authService.login(this.form.value.uid, this.form.value.password)
  }
}
