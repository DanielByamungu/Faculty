import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Coordinator } from 'src/models/users/coordinator.model';
import { CourseTaught } from '../../../models/course/courses_taught.model';
import { CourseSchedule } from '../../../models/schedules/course_schedule.model';
import { Faculty } from '../../../models/users/faculty.model';
import { SchedulerComponent } from '../../components/scheduler/scheduler.component';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-view-course-schedule',
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  templateUrl: './view-course-schedule.component.html',
  styleUrls: ['./view-course-schedule.component.css'],
})
export class ViewCourseScheduleComponent implements OnInit {
  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  public user: Coordinator | Faculty | undefined;
  public u_id: number = -1;
  public courseSchedule: CourseSchedule[] = [];
  @ViewChild('scheduleObj', { static: true })
  // @ts-ignore
  public scheduleObj: SchedulerComponent;
  public now = new Date();
  public selectedDate: Date = new Date(
    this.now.getFullYear(),
    this.now.getMonth(),
    this.now.getDate()
  );
  public monday: object = [];
  public tuesday: object = [];
  public wednesday: object = [];
  public thursday: object = [];
  public friday: object = [];
  public saturday: object = [];
  public sunday: object = [];
  public week: object[] = [];
  public currentView: View = 'WorkWeek';
  public showWeekend: boolean = true;
  public startWeek: Date = this.getMonday();
  public eventSettings: EventSettingsModel = {
    dataSource: this.week,
  };

  public coursesTaught: CourseTaught[] = [];

  async ngOnInit() {
    this.user = this._localStorage.getSessionObject('user');
    this.u_id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    // Get courses this u_id teaches
    this.coursesTaught = await this._restApi.getCoursesTaughtByUserId(
      this.u_id
    );
    for (const course of this.coursesTaught) {
      let scheduleCourse: CourseSchedule[] = [];
      scheduleCourse = await this._restApi.getCourseScheduleByCourseId(course.course_id);
      for (let i = 0; i < scheduleCourse.length; i++) {
        this.courseSchedule[i] = scheduleCourse[i];
      }
    }
    // Add the courseSchedule to the calendar
    await this.setEvent().then(() => {
      this.eventSettings = {
        dataSource: this.week,
      };
    });
  }

  getMonday() {
    let monday = new Date(this.now);
    let day = monday.getDay(),
      diff = monday.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(monday.setDate(diff));
  }

  public splitTimeHour(time: string): number {
    let timeParts = time.split(':');
    let hour = Number.parseInt(timeParts[0]);
    return parseInt(hour.toLocaleString('en-us'));
  }

  public splitTimeMinute(time: string): number {
    let timeParts = time.split(':');
    let minute = Number.parseInt(timeParts[1]);
    //console.log("MINUTE: " + minute.toLocaleString());
    return parseInt(minute.toLocaleString('en-us'));
  }

  async getCourseName(course_id: number) {
    let course = await this._restApi.getCourse(course_id);
    console.log("COURSE NAME: " + course.course_name);
    return course.course_name;
  }

  async setEvent() {
    for (let i = 0; i < this.courseSchedule.length; i++) {

      let startHour: any;
      let startMinute: any;
      let endHour: any;
      let endMinute: any;
      switch (this.courseSchedule[i].day_id) {
        case 0:
          startHour = this.splitTimeHour(this.courseSchedule[i].start_time);
          startMinute = this.splitTimeMinute(this.courseSchedule[i].start_time);
          endHour = this.splitTimeHour(this.courseSchedule[i].end_time);
          endMinute = this.splitTimeMinute(this.courseSchedule[i].end_time);

          this.sunday = {
            Id: this.courseSchedule[i].cs_id,
            Subject: this.getCourseName(this.courseSchedule[i].course_id),
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
          break;

        case 1:
          startHour = this.splitTimeHour(this.courseSchedule[i].start_time);
          startMinute = this.splitTimeMinute(this.courseSchedule[i].start_time);
          endHour = this.splitTimeHour(this.courseSchedule[i].end_time);
          endMinute = this.splitTimeMinute(this.courseSchedule[i].end_time);

          this.monday = {
            Id: this.courseSchedule[i].cs_id,
            Subject: await this.getCourseName(this.courseSchedule[i].course_id),
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
          break;

        case 2:
          startHour = this.splitTimeHour(this.courseSchedule[i].start_time);
          startMinute = this.splitTimeMinute(this.courseSchedule[i].start_time);
          endHour = this.splitTimeHour(this.courseSchedule[i].end_time);
          endMinute = this.splitTimeMinute(this.courseSchedule[i].end_time);

          this.tuesday = {
            Id: this.courseSchedule[i].cs_id,
            Subject: await this.getCourseName(this.courseSchedule[i].course_id),
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
          break;

        case 3:
          startHour = this.splitTimeHour(this.courseSchedule[i].start_time);
          startMinute = this.splitTimeMinute(this.courseSchedule[i].start_time);
          endHour = this.splitTimeHour(this.courseSchedule[i].end_time);
          endMinute = this.splitTimeMinute(this.courseSchedule[i].end_time);

          this.wednesday = {
            Id: this.courseSchedule[i].cs_id,
            Subject: await this.getCourseName(this.courseSchedule[i].course_id),
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
          break;

        case 4:
          startHour = this.splitTimeHour(this.courseSchedule[i].start_time);
          startMinute = this.splitTimeMinute(this.courseSchedule[i].start_time);
          endHour = this.splitTimeHour(this.courseSchedule[i].end_time);
          endMinute = this.splitTimeMinute(this.courseSchedule[i].end_time);

          this.thursday = {
            Id: this.courseSchedule[i].cs_id,
            Subject: await this.getCourseName(this.courseSchedule[i].course_id),
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
          break;

        case 5:
          startHour = this.splitTimeHour(this.courseSchedule[i].start_time);
          startMinute = this.splitTimeMinute(this.courseSchedule[i].start_time);
          endHour = this.splitTimeHour(this.courseSchedule[i].end_time);
          endMinute = this.splitTimeMinute(this.courseSchedule[i].end_time);

          this.friday = {
            Id: this.courseSchedule[i].cs_id,
            Subject: await this.getCourseName(this.courseSchedule[i].course_id),
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
          break;

        case 6:
          startHour = this.splitTimeHour(this.courseSchedule[i].start_time);
          startMinute = this.splitTimeMinute(this.courseSchedule[i].start_time);
          endHour = this.splitTimeHour(this.courseSchedule[i].end_time);
          endMinute = this.splitTimeMinute(this.courseSchedule[i].end_time);

          this.saturday = {
            Id: this.courseSchedule[i].cs_id,
            Subject: await this.getCourseName(this.courseSchedule[i].course_id),
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
          break;
      }
    }
    this.week = [
      this.sunday,
      this.monday,
      this.tuesday,
      this.wednesday,
      this.thursday,
      this.friday,
      this.saturday,
    ];
    console.log(this.week);
  }
}
