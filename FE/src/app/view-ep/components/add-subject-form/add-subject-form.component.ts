import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-add-subject-form',
  standalone: true,
  imports: [MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskDirective
    ],
  providers: [provideNgxMask()],
  templateUrl: './add-subject-form.component.html',
  styleUrl: './add-subject-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSubjectFormComponent {
  form = input.required<FormGroup>();
  patterns = input.required<any>();
}
