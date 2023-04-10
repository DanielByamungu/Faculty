import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersistenceService } from 'src/app/services/persistence.service';
import { Applicant } from 'src/models/users/applicant.model';
import {DayOfWeek} from "../../../models/schedules/days_week.model";
import {RestApiService} from "../../services/rest-api.service";
import {ApplicantAvailability} from "../../../models/schedules/applicant_availability.model";
import {Router} from "@angular/router";
import {Faculty} from "../../../models/users/faculty.model";

@Component({
  selector: 'app-add-availability',
  templateUrl: './add-availability.component.html',
  styleUrls: ['./add-availability.component.css']
})
export class AddAvailabilityComponent implements OnInit {
  public user: Applicant | Faculty = new Applicant();
  public days: DayOfWeek[] = [];
  public times: Time[] = [
    {Hour: 8, Minute: 0, Display:"8:00 AM"},
    {Hour: 8, Minute: 30, Display:"8:30 AM"},
    {Hour: 9, Minute: 0, Display:"9:00 AM"},
    {Hour: 9, Minute: 30, Display:"9:30 AM"},
    {Hour: 10, Minute: 0, Display:"10:00 AM"},
    {Hour: 10, Minute: 30, Display:"10:30 AM"},
    {Hour: 11, Minute: 0, Display:"11:00 AM"},
    {Hour: 11, Minute: 30, Display:"11:30 AM"},
    {Hour: 12, Minute: 0, Display:"12:00 PM"},
    {Hour: 12, Minute: 30, Display:"12:30 PM"},
    {Hour: 13, Minute: 0, Display:"1:00 PM"},
    {Hour: 13, Minute: 30, Display:"1:30 PM"},
    {Hour: 14, Minute: 0, Display:"2:00 PM"},
    {Hour: 14, Minute: 30, Display:"2:30 PM"},
    {Hour: 15, Minute: 0, Display:"3:00 PM"},
    {Hour: 15, Minute: 30, Display:"3:30 PM"},
    {Hour: 16, Minute: 0, Display:"4:00 PM"},
    {Hour: 16, Minute: 30, Display:"4:30 PM"},
    {Hour: 17, Minute: 0, Display:"5:00 PM"},
    {Hour: 17, Minute: 30, Display:"5:30 PM"},
    {Hour: 18, Minute: 0, Display:"6:00 PM"},
    {Hour: 18, Minute: 30, Display:"6:30 PM"},
    {Hour: 19, Minute: 0, Display:"7:00 PM"},
    {Hour: 19, Minute: 30, Display:"7:30 PM"},
    {Hour: 20, Minute: 0, Display:"8:00 PM"},
    {Hour: 20, Minute: 30, Display:"8:30 PM"},
    {Hour: 21, Minute: 0, Display:"9:00 PM"},
    {Hour: 21, Minute: 30, Display:"9:30 PM"},
    {Hour: 22, Minute: 0, Display:"10:00 PM"}
  ];
  public availability = new FormGroup({
    mondayStart: new FormControl("default"),
    mondayEnd: new FormControl("default"),
    tuesdayStart: new FormControl("default"),
    tuesdayEnd: new FormControl("default"),
    wednesdayStart: new FormControl("default"),
    wednesdayEnd: new FormControl("default"),
    thursdayStart: new FormControl("default"),
    thursdayEnd: new FormControl("default"),
    fridayStart: new FormControl("default"),
    fridayEnd: new FormControl("default"),
    saturdayStart: new FormControl("default"),
    saturdayEnd: new FormControl("default"),
    sundayStart: new FormControl("default"),
    sundayEnd: new FormControl("default"),
  });
  actionMessage: string = '';

  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _router: Router,
    ) { }

  async ngOnInit() {
    this.user = this._localStorage.getSessionObject("user");
    this.days = await this._restApi.getListDays();
    this.actionMessage = this._localStorage.getSessionObject("actionMsg");
  }

  onSubmit(): void {

    let mondayStart = this.availability.get('mondayStart')?.value;
    let mondayEnd = this.availability.get('mondayEnd')?.value;
    if ((mondayStart !== 'default' ) || (mondayEnd !== 'default')) {
      let availability = new ApplicantAvailability(
        this.user.u_id,
        this.days[1].day_id,
        <string>mondayStart,
        <string>mondayEnd
      );
      if (this.user.type_id == 4) {
        this._restApi.postFetch(availability, "/applicantavailability", 'post');
      } else {
        this._restApi.postFetch(availability, "/facultyavailability", 'post');
      }
    }

    let tuesdayStart = this.availability.get('tuesdayStart')?.value;
    let tuesdayEnd = this.availability.get('tuesdayEnd')?.value;
    if ((tuesdayStart !== 'default' || tuesdayStart !== undefined) || (tuesdayEnd !== 'default' || tuesdayEnd !== undefined)) {
      let availability = new ApplicantAvailability(
        this.user.u_id,
        this.days[2].day_id,
        <string>tuesdayStart,
        <string>tuesdayEnd
      );
      if (this.user.type_id == 4) {
        this._restApi.postFetch(availability, "/applicantavailability", 'post');
      } else {
        this._restApi.postFetch(availability, "/facultyavailability", 'post');
      }
    }

    let wednesdayStart = this.availability.get('wednesdayStart')?.value;
    let wednesdayEnd = this.availability.get('wednesdayEnd')?.value;
    if ((wednesdayStart !== 'default' || wednesdayStart !== undefined) || (wednesdayEnd !== 'default' || wednesdayEnd !== undefined)) {
      let availability = new ApplicantAvailability(
        this.user.u_id,
        this.days[3].day_id,
        <string>wednesdayStart,
        <string>wednesdayEnd
      );
      if (this.user.type_id == 4) {
        this._restApi.postFetch(availability, "/applicantavailability", 'post');
      } else {
        this._restApi.postFetch(availability, "/facultyavailability", 'post');
      }
    }

    let thursdayStart = this.availability.get('thursdayStart')?.value;
    let thursdayEnd = this.availability.get('thursdayEnd')?.value;
    if ((thursdayStart !== 'default' || thursdayStart !== undefined) || (thursdayEnd !== 'default' || thursdayEnd !== undefined)) {
      let availability = new ApplicantAvailability(
        this.user.u_id,
        this.days[4].day_id,
        <string>thursdayStart,
        <string>thursdayEnd
      );
      if (this.user.type_id == 4) {
        this._restApi.postFetch(availability, "/applicantavailability", 'post');
      } else {
        this._restApi.postFetch(availability, "/facultyavailability", 'post');
      }
    }

    let fridayStart = this.availability.get('fridayStart')?.value;
    let fridayEnd = this.availability.get('fridayEnd')?.value;
    if ((fridayStart !== 'default' || fridayStart !== undefined) || (fridayEnd !== 'default' || fridayEnd !== undefined)) {
      let availability = new ApplicantAvailability(
        this.user.u_id,
        this.days[5].day_id,
        <string>fridayStart,
        <string>fridayEnd
      );
      if (this.user.type_id == 4) {
        this._restApi.postFetch(availability, "/applicantavailability", 'post');
      } else {
        this._restApi.postFetch(availability, "/facultyavailability", 'post');
      }
    }

    let saturdayStart = this.availability.get('saturdayStart')?.value;
    let saturdayEnd = this.availability.get('saturdayEnd')?.value;
    if ((saturdayStart !== 'default' || saturdayStart !== undefined) || (saturdayEnd !== 'default' || saturdayEnd !== undefined)) {
      let availability = new ApplicantAvailability(
        this.user.u_id,
        this.days[6].day_id,
        <string>saturdayStart,
        <string>saturdayEnd
      );
      if (this.user.type_id == 4) {
        this._restApi.postFetch(availability, "/applicantavailability", 'post');
      } else {
        this._restApi.postFetch(availability, "/facultyavailability", 'post');
      }
    }

    let sundayStart = this.availability.get('sundayStart')?.value;
    let sundayEnd = this.availability.get('sundayEnd')?.value;
    if ((sundayStart !== 'default' || sundayStart !== undefined) || (sundayEnd !== 'default' || sundayEnd !== undefined)) {
      let availability = new ApplicantAvailability(
        this.user.u_id,
        this.days[0].day_id,
        <string>sundayStart,
        <string>sundayEnd
      );
      if (this.user.type_id == 4) {
        this._restApi.postFetch(availability, "/applicantavailability", 'post');
      } else {
        this._restApi.postFetch(availability, "/facultyavailability", 'post');
      }
    }
    this._localStorage.saveSessionObject("ADD AVAILABILITY SUCCESS!", "actionMsg");
    this._router.navigate(['job-postings'])
  }
}

interface Time {
  Hour: number;
  Minute: number;
  Display: string;
}
