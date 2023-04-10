export class JobPosting {
  job_id: number;
  course_id: number;

  constructor(course_id: number, job_id?: number) {
    this.job_id = <number>job_id;
    this.course_id = course_id;
  }
}
