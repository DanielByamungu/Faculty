import { Component, OnInit } from '@angular/core';
import {PersistenceService} from "../../services/persistence.service";
import {RestApiService} from "../../services/rest-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-courses-taught',
  templateUrl: './view-courses-taught.component.html',
  styleUrls: ['./view-courses-taught.component.css'],
})
export class ViewCoursesTaughtComponent implements OnInit {
  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {}

  filterTable(element: HTMLElement, value: string) {}
}
