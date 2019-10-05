import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  darkMode: boolean;
  themeSub;
  constructor(private ui: UiService) { }

  ngOnInit() {
    this.themeSub = this.ui.darkModeState.subscribe((value) => {
      this.darkMode = value;
    })
  }
}
