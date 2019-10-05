import { Component, OnInit } from '@angular/core';
import { FbService } from 'src/app/services/firebase/fb.service';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  cityOfTheMonth: string = 'Oyo';
  todayDate: Date = new Date();
  temp: number;
  city :string = this.cityOfTheMonth;
  state: string;
  capitals = [];
  selectedCity;
  cardCity;
  showNote = false;
  followedCM = false;
  sub1;

  constructor(private http: HttpClient, private weather: WeatherService ,private fb: FbService) { }

  ngOnInit() {
    // Get city of the month weather details
    this.weather.getWeather(this.city).subscribe((payload: any) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });

    // Get all other countries
    this.http.get('https://restcountries.eu/rest/v2/all').pipe((first()))
      .subscribe((countries: Array<any>) => {
        countries.forEach((country: any) => {
          if (country.capital.length) {
            this.capitals.push(country.capital);
          }
        });
      });

    // Get cites in Nigeria and add to countries array
    this.http.get('https://locationsng-api.herokuapp.com/api/v1/cities').pipe((first()))
      .subscribe((cities: Array<any>) => {
        cities.forEach((city) => {
          if (city.state.length) {
            this.capitals.push(city.state);
          }
        })
        this.capitals.sort();
      })

    this.sub1 = this.fb.getCities().subscribe((cities) => {
      Object.values(cities).forEach((city: any) => {
        if (city.name === this.cityOfTheMonth) {
          this.followedCM = true;
        }
      });
    });
  }

  selectCity(city) {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else if (city.leading > 0) {
      this.showNote = true;
    }
  }

  addCityOfTheMonth() {
    this.fb.addCity(this.cityOfTheMonth).subscribe(() => {
      this.followedCM = true;
    });
  }

}
