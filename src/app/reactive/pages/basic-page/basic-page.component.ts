import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';
@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;
  
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]/** Validadores sincronos */, []/**Validadores asincronos */],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })
  

  getFieldError(fieldName: string): string | null {
    if(!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors??{};

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'El campo es requerido';
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres `
        case 'min':
          return `Valor minimo de ${errors['min'].min}`
      }
    }
    return null;
  }

  onSubmit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({
      price:0,
      inStorage:0,
    })
  }
}
