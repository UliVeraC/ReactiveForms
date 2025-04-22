import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

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
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.bordersByCountry.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap(region =>
          this.countryService.getCountrysByRegion(region!)
        )
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries)
      })
  }
  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode ?? '')
        ),
        switchMap(country => 
          this.countryService.getCountryBorderByCodes(country.borders)
        )
      )
      .subscribe((borders) => {
        this.bordersByCountry.set(borders);
      })
  }

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();
    const countrySuscription = this.onCountryChanged();
    onCleanup(() => {
      regionSubscription.unsubscribe()
      countrySuscription.unsubscribe()
    });
  });


}
