import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AgendaService,
  DayService, EventSettingsModel, MonthAgendaService,
  MonthService, ScheduleComponent,
  TimelineMonthService,
  TimelineViewsService, View,
  WeekService, WorkWeekService
} from "@syncfusion/ej2-angular-schedule";
import {LoginComponent} from "../../views/login/login.component";
import {ActivatedRoute, Router} from "@angular/router";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import {PersistenceService} from "../../services/persistence.service";
import {RestApiService} from "../../services/rest-api.service";
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';


@Component({
  selector: 'app-scheduler',
  template: `
    <navbar>
      <navlink [active]="false" [signOut]="true" linkval="Sign out"></navlink>
    </navbar>
    <button #addButtonObj ejs-button cssClass='e-info' (click)='add()'> Add </button>
    <button #editButtonObj ejs-button cssClass='e-info' (click)='edit()'> Edit </button>
    <button #deleteButtonObj ejs-button cssClass='e-info' (click)='delete()'> Delete </button>
    <ejs-schedule width='100%' height='300px' [selectedDate]='selectedDate' [currentView]='currentView' [eventSettings]='eventSettings'><e-views> <e-view option="Week" startHour="07:00" endHour="15:00" ></e-view>
      <e-view option="WorkWeek" startHour="10:00" endHour="18:00"></e-view> <e-view option="Month" [showWeekend]="showWeekend"></e-view></e-views></ejs-schedule>`,
  //templateUrl: `./scheduler.component.html`,
  styleUrls: ['./scheduler.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],

})
export class SchedulerComponent implements OnInit {

  public data: object[] = [{
    Id: 1,
    Subject: 'Available',
    StartTime: new Date(2023, 2, 7, 13, 0),
    EndTime: new Date(2023, 2, 7,  14, 30)
  }];

  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  }
  public selectedDate: Date = new Date(2023, 2, 8);
  public currentView: View = 'WorkWeek';
  public showWeekend: boolean = true;
  @ViewChild('scheduleObj', { static: true })
  // @ts-ignore
  public scheduleObj: ScheduleComponent;
  @ViewChild('addButtonObj', { static: true })
  // @ts-ignore
  public addButtonObj: ButtonComponent;
  @ViewChild('editButtonObj', { static: true })
  // @ts-ignore
  public editButtonObj: ButtonComponent;
  @ViewChild('deleteButtonObj', { static: true })
  // @ts-ignore
  public deleteButtonObj: ButtonComponent;

  constructor(
    private _login: LoginComponent,
    private _router: Router,
    private _convertJson: JsonConvertionsService,
    private _getUrl: ActivatedRoute,
    private _persistence: PersistenceService,
    private _restApi: RestApiService,
  ) {  }

  ngOnInit(): void {
    console.log(this._convertJson.toJSON(this.data[0]));
  }

  add(): void {
    let Data: Object[] = [{
      Id: 1,
      Subject: 'Conference',
      StartTime: new Date(2018, 1, 12, 9, 0),
      EndTime: new Date(2018, 1, 12, 10, 0),
      IsAllDay: false
    },{
      Id: 2,
      Subject: 'Meeting',
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 11, 30),
      IsAllDay: false
    }];
    this.scheduleObj.addEvent(Data);
    this.addButtonObj.element.setAttribute('disabled','true');
  }
  edit(): void {
    let data: { [key: string]: Object; } = {
      Id: 3,
      Subject: 'Testing-edited',
      StartTime: new Date(2018, 1, 11, 10, 0),
      EndTime: new Date(2018, 1, 11, 11, 0),
      IsAllDay: false
    };
    this.scheduleObj.saveEvent(data);
    this.editButtonObj.element.setAttribute('disabled','true');
  }
  delete(): void {
    this.scheduleObj.deleteEvent(4);
    this.deleteButtonObj.element.setAttribute('disabled', 'true');
  }
}
