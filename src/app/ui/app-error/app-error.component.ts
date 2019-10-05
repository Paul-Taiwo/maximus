import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.css']
})
export class AppErrorComponent implements OnInit {
  @Input() message: string;
  action: string = 'Got it';


  constructor() { }

  ngOnInit() {
  }

  hideErrorMessage() {
    this.message = '';
  }
}
