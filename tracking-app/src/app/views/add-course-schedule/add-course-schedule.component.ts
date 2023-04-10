import {Component, OnInit, ViewChild} from '@angular/core';
import {PersistenceService} from 'src/app/services/persistence.service';
import {Coordinator} from 'src/models/users/coordinator.model';
import {
  AgendaService,
  DayService,
  EventSettingsModel,
  MonthService,
  View,
  WeekService,
  WorkWeekService,
  EventClickArgs,
  ScheduleComponent,
} from "@syncfusion/ej2-angular-schedule";
import {RestApiService} from "../../services/rest-api.service";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {DataManager, ODataV4Adaptor, Query} from '@syncfusion/ej2-data';
import {CourseSchedule} from "../../../models/schedules/course_schedule.model";
import {Course} from "../../../models/course/course.model";

@Component({
  selector: 'app-add-course-schedule',
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  templateUrl: './add-course-schedule.component.html',
  styleUrls: ['./add-course-schedule.component.css'],
})
export class AddCourseScheduleComponent implements OnInit {
  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _json: JsonConvertionsService,
    private _activatedRoute: ActivatedRoute,
    private _router: RouterModule
  ) {}

  public course_id: number = -1;
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent | undefined;
  public user = new Coordinator();
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
  public currentView: View = 'Week';
  public showWeekend: boolean = true;
  public startWeek: Date = this.getMonday();
  public eventSettings: EventSettingsModel = {
    dataSource: this.week,
    fields: {
      id: 'cs_id',
      subject: { name: 'course_code', title: 'Course Code' },
      location: { name: 'classroom', title: 'Class Room', default: 'Add Classroom #' },
    }
  };
  // @ts-ignore
  public class: CourseSchedule = new CourseSchedule();
  public course: Course = new Course();


  async ngOnInit() {
    this.user = this._localStorage.getSessionObject('user');
    this.course_id = parseInt(<string>this._activatedRoute.snapshot.paramMap.get('id'));
    this.course = await this._restApi.getCourse(this.course_id);
    if (this.user.type_id == null) {
      this.user.type_id = 4;
    }
  }

  getMonday() {
    let monday = new Date(this.now);
    let day = monday.getDay(),
      diff = monday.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(monday.setDate(diff));
  }

  // I think I need to change this to a Sumit of some sort that
  // gets all the onDataBound objects

  async onDataBound(scheduleObj: ScheduleComponent) {
    let event: Object[] = scheduleObj.getCurrentViewEvents();
    if (event.length > 0) {
      for (let i = 0; i < event.length; i++) {
        let data: Object = await this._json.toJSON(event[i]);
        let start = new Date(this._json.fromJson(data).StartTime);
        let end = new Date(this._json.fromJson(data).EndTime);

        // set up a course_schedule model
        // course_id
        this.class.course_id = this.course_id;

        // day_id
        let day = start.getDay();
        this.class.day_id = day;

        // start_time
        // hour
        let hour = start.getHours();
        // minute
        let minute = start.getMinutes();
        let startTime = hour + ":" + minute;
        this.class.start_time = startTime;

        // end_time
        // hour
        hour = end.getHours();
        // minute
        minute = end.getMinutes();
        let endTime = hour + ":" + minute;
        console.log("End Time: " + endTime);
        this.class.end_time = endTime;
        this._restApi.postFetch(this.class, '/courseschedule', 'post');
      }
    }

  }

  onClick(scheduleObj: ScheduleComponent) {
    let x = document.getElementsByClassName('e-subject e-field e-input');
    // @ts-ignore
    x.course_code.value = this.course.course_code;
  }
}
