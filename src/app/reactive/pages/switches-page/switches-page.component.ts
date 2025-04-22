import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {
  formUtils = FormUtils;

  private fb = inject(FormBuilder);
  
  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    notification: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  onSubmite() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }

}
