import {Time} from "@angular/common";

export class FacultyAvailability {
  av_id: number;
  u_id: number;
  day_id: number;
  start_time: string;
  end_time: string;
  /*start_time: Date;
  end_time: Date;*/

  constructor(av_id: number = -1, u_id: number = -1, day_id: number = -1, start_time: string, end_time: string) {
    this.av_id = av_id;
    this.u_id = u_id;
    this.day_id = day_id;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}
/*type Time = {
    hours: number;
    minutes: number;
};*/
