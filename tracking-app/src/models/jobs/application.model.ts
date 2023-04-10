export class Application {
  app_id:number = -1;
  s_id: number = -1;
  job_id: number = -1;
  date_created: Date = new Date();
  available_term: boolean = false;
  vacation_planned: boolean = false;
  available_in_person_waterloo: boolean = false;
  available_in_person_guelph: boolean = false;
  residing_ontario: boolean = false;
  hrs_week: string = "";
  comments: string = "";
  u_id: number = -1;

  constructor() {
  }
}
