import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);

  formutils = FormUtils;
  myForm2: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]/** Validadores sincronos */, []/**Validadores asincronos */],
    favoriteGames: this.fb.array([
      ['Sekiro', Validators.required],
      ['Lies of p', Validators.required],
    ],[Validators.minLength(3)]),
    
  })
  newFavorite = new FormControl('', Validators.required);

  get favoriteGames(){
    return this.myForm2.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required))

    this.newFavorite.reset();

  }

  onDelete(index: number){
    this.favoriteGames.removeAt(index)
  }

  onSubmit(){
    this.myForm2.markAllAsTouched();
  }

}
