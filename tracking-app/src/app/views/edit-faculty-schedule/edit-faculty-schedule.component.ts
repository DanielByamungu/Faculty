import { Component, OnInit } from '@angular/core';
import { AgendaService, DayService, MonthService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-edit-faculty-schedule',
  templateUrl: './edit-faculty-schedule.component.html',
  styleUrls: ['./edit-faculty-schedule.component.css'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ]
})
export class EditFacultyScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
