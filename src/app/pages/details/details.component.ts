import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';
import { Subscription, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  darkMode: boolean;
  themeSub: Subscription;
  cityIllustrationPath: string;
  daysForecast: any;
  errorMessage: string;
  temp: number;
  state: string;
  today: string;
  sub2: Subscription;
  humidity: string;
  wind: number;
  city: string;

  constructor(private ui: UiService, private activeRouter: ActivatedRoute, private weather: WeatherService) { }

  ngOnInit() {
    this.themeSub = this.ui.darkModeState.subscribe((value) => {
      this.darkMode = value;
    });

    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    this.sub2 = this.activeRouter.paramMap.pipe(concatMap((route: any) => {
      // Get city from route parameter
      this.city = route.params.city;
      switch (this.city.toLowerCase()) {
        case 'paris':
          this.cityIllustrationPath = '../../../assets/cities/france.svg';
          break;
        case 'doha':
          this.cityIllustrationPath = '../../assets/cities/qatar.svg';
          break;
        case 'rabat':
          this.cityIllustrationPath = '../../assets/cities/rabat.svg';
          break;
        case 'tunis':
          this.cityIllustrationPath = '../../assets/cities/tunis.svg';
          break;
        case 'tokyo':
          this.cityIllustrationPath = '../../assets/cities/japan.svg';
          break;
        default:
          this.cityIllustrationPath = '../../assets/cities/default.svg';
      }

      return forkJoin(this.weather.getWeather(this.city), this.weather.getForecast(this.city));
    })
    ).subscribe((payload: any) => {
      console.log(payload)
      this.state = payload[0].weather[0].main;
      this.temp = Math.ceil(Number(payload[0].main.temp));
      this.humidity = payload[0].main.humidity;
      this.wind = Math.round(Math.round(payload[0].wind.speed));

      const dates = {};
      for (const res of payload[1]) {
        const date = new Date(res.dt_txt).toDateString().split(' ')[0];
        if (dates[date]) {
          dates[date].counter += 1;
          dates[date].temp += res.main.temp;
        } else {
          dates[date] = {
            state: res.weather[0].main,
            temp: res.main.temp,
            counter: 1
          };
        }
      }

      Object.keys(dates).forEach((day) => {
        dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
      });

      delete dates[Object.keys(dates)[0]];
      this.daysForecast = dates;
    }, (err) => {
      this.errorMessage = err.error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2500);
    });

    // this.tweets$ = this.twitter.fetchTweets(this.city);
  }

}
