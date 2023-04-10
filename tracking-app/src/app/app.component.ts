import { Component, OnInit } from '@angular/core';
import { PersistenceService } from "./services/persistence.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Home';
  constructor(private _persistence: PersistenceService) {
  }
  ngOnInit(): void {
  }
}
