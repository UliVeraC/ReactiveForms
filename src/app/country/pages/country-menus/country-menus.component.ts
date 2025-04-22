import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-menus',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-menus.component.html',
})
export class CountryMenusComponent {

  fb = inject(FormBuilder);
  countryService = inject(CountryService);
  regions = signal(this.countryService.getRegions());
  countriesByRegion = signal<Country[]>([]);
  bordersByCountry = signal<Country[]>([]);

  myForm = this.fb.group({
    region:['', Validators.required],
    country:['', Validators.required],
    border:['', Validators.required],
  })
}
