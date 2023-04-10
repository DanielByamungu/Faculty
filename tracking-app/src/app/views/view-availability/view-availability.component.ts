import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AgendaService,
  DayService,
  EventSettingsModel,
  MonthService,
  View,
  WeekService,
  WorkWeekService,
} from '@syncfusion/ej2-angular-schedule';
import { PersistenceService } from 'src/app/services/persistence.service';
import { Applicant } from 'src/models/users/applicant.model';
import { ApplicantAvailability } from '../../../models/schedules/applicant_availability.model';
import { SchedulerComponent } from '../../components/scheduler/scheduler.component';
import { JsonConvertionsService } from '../../services/json-convertions.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-view-availability',
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  templateUrl: './view-availability.component.html',
  styleUrls: ['./view-availability.component.css'],
})
export class ViewAvailabilityComponent implements OnInit {
  @ViewChild('scheduleObj', { static: true })
  // @ts-ignore
  public scheduleObj: SchedulerComponent;
  // @ts-ignore
  public user: Applicant = new Applicant();
  public data: ApplicantAvailability[] = [];
  public monday: object = [];
  public tuesday: object = [];
  public wednesday: object = [];
  public thursday: object = [];
  public friday: object = [];
  public saturday: object = [];
  public sunday: object = [];
  public week: object[] = [];
  public now = new Date();
  public selectedDate: Date = new Date(
    this.now.getFullYear(),
    this.now.getMonth(),
    this.now.getDate()
  );
  public currentView: View = 'WorkWeek';
  public showWeekend: boolean = true;
  public startWeek: Date = this.getMonday();
  public eventSettings: EventSettingsModel = {
    dataSource: this.week,
  };

  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _json: JsonConvertionsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  getMonday() {
    let monday = new Date(this.now);
    let day = monday.getDay(),
      diff = monday.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(monday.setDate(diff));
  }

  async setEvent(table: string, u_id: number) {
    this.data = await this._restApi.getAvailability(table, u_id);

    const setMonday = () => {
      let startHour = this.splitTimeHour(this.data[0]?.start_time);
      let startMinute = this.splitTimeMinute(this.data[0]?.start_time);
      let endHour = this.splitTimeHour(this.data[0]?.end_time);
      let endMinute = this.splitTimeMinute(this.data[0]?.end_time);

      this.monday = {
        Id: this.data[0].av_id,
        Subject: 'Available',
        StartTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate(),
          startHour,
          startMinute
        ),
        EndTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate(),
          endHour,
          endMinute
        ),
      };
      return this.monday;
    };

    const setTuesday = () => {
      let startHour = this.splitTimeHour(this.data[1].start_time);
      let startMinute = this.splitTimeMinute(this.data[1].start_time);
      let endHour = this.splitTimeHour(this.data[1].end_time);
      let endMinute = this.splitTimeMinute(this.data[1].end_time);

      this.tuesday = {
        Id: this.data[1].av_id,
        Subject: 'Available',
        StartTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 1,
          startHour,
          startMinute
        ),
        EndTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 1,
          endHour,
          endMinute
        ),
      };
      return this.tuesday;
    };

    const setWednesday = () => {
      let startHour = this.splitTimeHour(this.data[2].start_time);
      let startMinute = this.splitTimeMinute(this.data[2].start_time);
      let endHour = this.splitTimeHour(this.data[2].end_time);
      let endMinute = this.splitTimeMinute(this.data[2].end_time);

      this.wednesday = {
        Id: this.data[2].av_id,
        Subject: 'Available',
        StartTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 2,
          startHour,
          startMinute
        ),
        EndTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 2,
          endHour,
          endMinute
        ),
      };
      return this.wednesday;
    };

    const setThursday = () => {
      let startHour = this.splitTimeHour(this.data[3]?.start_time);
      let startMinute = this.splitTimeMinute(this.data[3]?.start_time);
      let endHour = this.splitTimeHour(this.data[3]?.end_time);
      let endMinute = this.splitTimeMinute(this.data[3].end_time);

      this.thursday = {
        Id: this.data[3].av_id,
        Subject: 'Available',
        StartTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 3,
          startHour,
          startMinute
        ),
        EndTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 3,
          endHour,
          endMinute
        ),
      };
      return this.thursday;
    };

    const setFriday = () => {
      let startHour = this.splitTimeHour(this.data[4].start_time);
      let startMinute = this.splitTimeMinute(this.data[4].start_time);
      let endHour = this.splitTimeHour(this.data[4].end_time);
      let endMinute = this.splitTimeMinute(this.data[4].end_time);

      this.friday = {
        Id: this.data[4].av_id,
        Subject: 'Available',
        StartTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 4,
          startHour,
          startMinute
        ),
        EndTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 4,
          endHour,
          endMinute
        ),
      };
      return this.friday;
    };

    const setSaturday = () => {
      let startHour = this.splitTimeHour(this.data[5].start_time);
      let startMinute = this.splitTimeMinute(this.data[5].start_time);
      let endHour = this.splitTimeHour(this.data[5].end_time);
      let endMinute = this.splitTimeMinute(this.data[5].end_time);

      this.saturday = {
        Id: this.data[5].av_id,
        Subject: 'Available',
        StartTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 5,
          startHour,
          startMinute
        ),
        EndTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() + 5,
          endHour,
          endMinute
        ),
      };
      return this.saturday;
    };

    const setSunday = () => {
      let startHour = this.splitTimeHour(this.data[6].start_time);
      let startMinute = this.splitTimeMinute(this.data[6].start_time);
      let endHour = this.splitTimeHour(this.data[6].end_time);
      let endMinute = this.splitTimeMinute(this.data[6].end_time);

      this.sunday = {
        Id: this.data[6].av_id,
        Subject: 'Available',
        StartTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() - 1,
          startHour,
          startMinute
        ),
        EndTime: new Date(
          this.startWeek.getFullYear(),
          this.startWeek.getMonth(),
          this.startWeek.getDate() - 1,
          endHour,
          endMinute
        ),
      };
      return this.sunday;
    };
    this.week = [
      setMonday(),
      setTuesday(),
      setWednesday(),
      setThursday(),
      setFriday(),
      setSaturday(),
      setSunday(),
    ];
  }

  async ngOnInit() {
    let u_id = Number(this._activatedRoute.snapshot.paramMap.get('u_id'));
    this.user = await this._restApi.getApplicantById(u_id);
    let type_id = Number(this._activatedRoute.snapshot.paramMap.get('type_id'));
    if (type_id > 2) {
      if (type_id == 3) {
        this.user = await this._restApi.getFacultyById(u_id);
        let table = 'facultyavailability';
        await this.setEvent(table, this.user.u_id).then(() => {
          this.eventSettings = {
            dataSource: this.week,
          };
        });
      } else {
        this.user = await this._restApi.getApplicantById(u_id);
        let table = 'applicantavailability';
        await this.setEvent(table, this.user.u_id).then(() => {
          this.eventSettings = {
            dataSource: this.week,
          };
        });
      }
    }
  }

  public splitTimeHour(time: string): number {
    let timeParts = time.split(':');
    let hour = Number.parseInt(timeParts[0]);
    //console.log("HOUR: " + hour.toLocaleString());
    return parseInt(hour.toLocaleString('en-us'));
  }

  public splitTimeMinute(time: string): number {
    let timeParts = time.split(':');
    let minute = Number.parseInt(timeParts[1]);
    //console.log("MINUTE: " + minute.toLocaleString());
    return parseInt(minute.toLocaleString('en-us'));
  }
}

