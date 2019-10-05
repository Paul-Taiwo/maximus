import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';
import { FbService } from 'src/app/services/firebase/fb.service';
import { map, first } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  state: string;
  cityName: string;
  condition: string;
  currentTemp: number;
  conditon: string;
  temp;
  minTemp: number;
  maxTemp: number;
  darkMode: boolean;
  errorMessage: string;
  themeSub;

  @Input() addMode: boolean;
  @Output() cityStored = new EventEmitter();
  citesWeather: Object;
  sub1: Subscription;
  cityAdded: boolean = false;

  @Input() set city(city: string) {
    this.cityName = city;
    this.weather.getWeather(city)
      .pipe(first())
      .subscribe((weatherData) => {
        this.state = weatherData.weather[0].main;
        this.currentTemp = Math.round(weatherData.main.temp);
        this.minTemp = Math.round(weatherData.main.temp_min);
        this.maxTemp = Math.round(weatherData.main.temp_max);
        this.condition = weatherData.weather[0].description;
        // console.log(weatherData);
      }, (err) => {
        this.errorMessage = err.message;
        setTimeout(()=> {this.errorMessage = ''}, 3000)
      });

      // this.weather.getForecast(city)
      //   .pipe(first())
      //   .subscribe((forecastData) => {
      //     console.log(forecastData)
      //   });
  };

  constructor(private ui: UiService, 
              private fb: FbService, 
              private weather: WeatherService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.themeSub = this.ui.darkModeState.subscribe((value) => {
      this.darkMode = value;
    });
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }

  openDetails() {
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity() {
    this.fb.addCity(this.cityName).subscribe(() => {
      this.cityName = null;
      this.maxTemp = null;
      this.minTemp = null;
      this.state = null;
      this.temp = null;
      this.cityAdded = true;
      this.cityStored.emit();
      setTimeout(() => this.cityAdded = false, 2000);
    });
  }

}
