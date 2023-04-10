import {Component, OnInit} from '@angular/core';
import {PersistenceService} from 'src/app/services/persistence.service';
import {RestApiService} from 'src/app/services/rest-api.service';
import {Course} from 'src/models/course/course.model';
import {Applicant} from 'src/models/users/applicant.model';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Term} from "../../../models/course/term.model";
import {JobPosting} from "../../../models/jobs/job_posting.model";
import {CourseTaught} from "../../../models/course/courses_taught.model";

@Component({
  selector: 'app-add-jobposting',
  templateUrl: './add-jobposting.component.html',
  styleUrls: ['./add-jobposting.component.css'],
})
export class AddJobpostingComponent implements OnInit {
  public user: Applicant = new Applicant();
  public allJobList: Course[] = [];
  public termJobList: Course[] = [];
  public termList: Term[] = [];
  public courseTaughtList: CourseTaught[] = [];
  public reducedJobList: Course[] = []; // For Courses that have NO FACULTY assigned to teach
  public posting: JobPosting = new JobPosting(-1, -1);

  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _router: Router,
  ) {
  }

  addJobForm = new FormGroup({
    courseId: new FormControl(),
    courseCode: new FormControl(),
    courseName: new FormControl(),
    termId: new FormControl("-1"),
  });

  async ngOnInit() {
    this.user = this._localStorage.getSessionObject('user');
    this.allJobList = await this._restApi.getListCourses();
    this.termList = await this._restApi.getListTerms();
    this.courseTaughtList = await this._restApi.getCoursesTaughtList();
  }

  submit() {
    let course_id = this.addJobForm.get('courseId')?.value;
    let course_name = this.addJobForm.get('courseName')?.value;
    let course_code = this.addJobForm.get('courseCode')?.value;
    let term_id = this.addJobForm.get('termId')?.value;
    console.log(course_id);
    this.posting = new JobPosting(parseInt(course_id));
    this._restApi.postFetch(this.posting, "/jobpostings", "post")
    // Add success msg, navigate to Job Postings Page
    this._localStorage.saveSessionObject("Job Posting Added SUCCESSFULLY!", "actionMsg")
    this._router.navigate(['job-postings']);
  }

  onSelectTerm(job_id: HTMLSelectElement) {
    let a = 0;
    for (let i = 0; i < this.allJobList.length; i++) {
      let match = false;
      for (let x = 0; x < this.courseTaughtList.length; x++) {
        if (this.allJobList[i].course_id === this.courseTaughtList[x].course_id) {
          match = true;
        }
      }
      if (!match) {
        this.reducedJobList[a++] = this.allJobList[i];
      }
    }
    this.termJobList = [];
    let id: number = parseInt(job_id.value.toString());
    this.reducedJobList.forEach((job) => {
      if (job.term_id === id) {
        this.termJobList.push(job);
      }
    });
    console.log("TermJobList LENGTH: " + this.termJobList.length);
  }

  onSelectCourse(course_name: HTMLSelectElement) {
    let courseId: number = parseInt(course_name.value.toString());
    this.allJobList.forEach((job) => {
      if (job.course_id === courseId) {
        this.addJobForm.controls.courseCode.setValue(job.course_code);
        this.addJobForm.controls.courseId.setValue(job.course_id);
      }
    });
  }
}
