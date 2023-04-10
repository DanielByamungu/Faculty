import {Time} from "@angular/common";

export class CourseSchedule {
  cs_id: number;
  course_id: number;
  day_id: number;
  start_time: string;
  end_time: string;
  /*start_time: Date;
  end_time: Date;*/

  constructor(course_id: number = -1, day_id: number = -1, start_time: string ="", end_time: string ="", cs_id?:number) {
    this.course_id = course_id;
    this.day_id = day_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.cs_id = <number>cs_id;
  }
}
