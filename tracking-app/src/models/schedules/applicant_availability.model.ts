import {Time} from "@angular/common";

export class ApplicantAvailability {
  // @ts-ignore
  av_id: number | undefined;
  u_id: number;
  day_id: number;
  start_time: string;
  end_time: string;


  constructor(u_id: number, day_id: number, start_time: string, end_time: string, av_id?: number) {
    this.u_id = u_id;
    this.day_id = day_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.av_id = av_id;
  }
}

