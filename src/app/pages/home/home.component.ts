import { Component, OnInit } from '@angular/core';
import { FbService } from 'src/app/services/firebase/fb.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities;
  constructor(private fb: FbService) { }

  ngOnInit() {

    this.cities = this.fb.getCities()
  }
  
}
