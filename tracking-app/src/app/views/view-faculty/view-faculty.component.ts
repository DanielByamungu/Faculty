import { Component, OnInit } from '@angular/core';
import { PersistenceService } from 'src/app/services/persistence.service';
import { Applicant } from 'src/models/users/applicant.model';
import {Router} from "@angular/router";
import {RestApiService} from "../../services/rest-api.service";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import calculateAvgRating, {Faculty} from "../../../models/users/faculty.model";
import {Rating} from "../../../models/users/rating.model";

@Component({
  selector: 'app-view-faculty',
  templateUrl: './view-faculty.component.html',
  styleUrls: ['./view-faculty.component.css']
})
export class ViewFacultyComponent implements OnInit {
  public user: Applicant = new Applicant();
  errorMessage: any;
  isError: boolean = false;
  filterType: string = "ALL";
  facultyList: Faculty[] = [];
  actionMessage: string = '';
  facultyRatingList: Rating[] = [];
  facultyAvgList: number[] = [];

  constructor(
    private _router: Router,
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _convert: JsonConvertionsService,
  ) {
  }

  async ngOnInit() {
    this.user = this._localStorage.getSessionObject("user");
    this.actionMessage = this._localStorage.getSessionObject("actionMsg");
    this.facultyList = await this._restApi.getListFaculty();
    for (let i = 0; i < this.facultyList.length; i++) {
      this.facultyRatingList = await this._restApi.getFacultyRatingsById(this.facultyList[i].u_id);
      let avg: number = 0.00;
      if (this.facultyRatingList.length != undefined || this.facultyRatingList.length > 0) {
        for (let x = 0; x < this.facultyRatingList.length; x++) {
          // @ts-ignore
          avg += this.facultyRatingList[x].rating_value;
        }
        if (avg > 0) {
          avg = avg/(this.facultyRatingList.length);
        }
        this.facultyAvgList[i] = avg;
      }
      this.facultyAvgList[i] = avg;
      console.log(typeof this.facultyAvgList[i]);
    }
  }

  async filterTable(filterBy: HTMLInputElement, type: string) {
    this.filterType = type;
    let url: string = "";
    if (type === "NAME") {
      let fName = filterBy.value.toUpperCase().trim();
      url = `faculty/fullname/${fName}`;
      this.facultyList = [];
      this.facultyList[0] = await this._restApi.getFacultyByFullName(url);
      await this._router.navigate(['view-faculty']);
    }
    if (type === "EMAIL") {
      let email = filterBy.value.trim();
      url = `faculty/byemail/${email}`;
      this.facultyList = [];
      this.facultyList[0] = await this._restApi.getFacultyByEmail(url);
      await this._router.navigate(['view-faculty']);
    }
  }
}
