import { Component, OnInit } from '@angular/core';
import {Applicant} from "../../../models/users/applicant.model";
import {PersistenceService} from "../../services/persistence.service";
import {RestApiService} from "../../services/rest-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {JobPosting} from "../../../models/jobs/job_posting.model";
import {Course} from "../../../models/course/course.model";
import {Term} from "../../../models/course/term.model";
import {CourseTaught} from "../../../models/course/courses_taught.model";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-edit-jobposting',
  templateUrl: './edit-jobposting.component.html',
  styleUrls: ['./edit-jobposting.component.css']
})
export class EditJobpostingComponent implements OnInit {
  public user: Applicant = new Applicant();
  public posting: JobPosting = new JobPosting(-1, -1);
  public course: Course = new Course();
  public term: Term = new Term();
  public jobPostingId: number = -1;
  public termList: Term[] = [];
  public allJobList: Course[] = [];
  public termJobList: Course[] = [];
  public courseTaughtList: CourseTaught[] = [];
  public reducedJobList: Course[] = []; // For Courses that have NO FACULTY assigned to teach

  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.user = await this._localStorage.getSessionObject('user');
    this.jobPostingId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.posting = <JobPosting>await this._restApi.getPostingById(this.jobPostingId);
    this.allJobList = await this._restApi.getListCourses();
    this.termList = await this._restApi.getListTerms();
    this.course = <Course>await this._restApi.getCourse(this.posting.course_id)
    this.term = await this._restApi.getTerm(this.course.term_id);
    this.courseTaughtList = await this._restApi.getCoursesTaughtList();

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
    this.reducedJobList.forEach((job) => {
      if (job.term_id === this.term.term_id) {
        this.termJobList.push(job);
      }
    });
    this.termJobList.push(this.course);
  }

  onSelectTerm(term_id: NgModel) {
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
    let id: number = parseInt(term_id.value.toString());
    this.reducedJobList.forEach((job) => {
      if (job.term_id === id) {
        this.termJobList.push(job);
      }
    });
  }

  onSelectCourse(course_name: NgModel, course_code: NgModel) {
    let courseCode = course_code;
    let courseId: number = course_name.value;
    this.allJobList.forEach((job) => {
      if (job.course_id == courseId) {
        courseCode.control.setValue(job.course_code);
      }
    });
  }

  submit() {
    let course_id = (<HTMLInputElement>document.getElementById('courseName')).value;
    this.posting.course_id = parseInt(course_id);
    console.log("Posting Job ID: " + this.posting.job_id);
    console.log("Posting Course ID: " + this.posting.course_id);
    this._restApi.postFetch(this.posting, "/jobpostings/"+this.posting.job_id, "put")
  }
}
