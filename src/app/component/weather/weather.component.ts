import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,                 // ✅ OBLIGATOIRE
  imports: [NgIf, ReactiveFormsModule], // ✅ ReactiveFormsModule ici
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {

  searchForm!: FormGroup;
  weatherData: any;
errorMsg = "";

  constructor(private fb: FormBuilder , private WeatherService :WeatherService ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      city: ['', Validators.required]
    });
  }

  onSearch() {
    console.log(this.searchForm.value);
    this.WeatherService.searcheWeather(this.searchForm.value).subscribe(
      res => {
      this.weatherData = res.obj ;
      
    }
    );
  }
}
