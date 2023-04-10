import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Applicant } from 'src/models/users/applicant.model';
import { PersistenceService } from "../../services/persistence.service";
import {JobPosting} from "../../../models/jobs/job_posting.model";
import {RestApiService} from "../../services/rest-api.service";
import {Course} from "../../../models/course/course.model";
import {response} from "express";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import {Term} from "../../../models/course/term.model";

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {
  public user: Applicant = new Applicant();
  actionMessage: string = '';
  public jobsList: JobPosting[] = [];
  public jobsListCourses: Course[] = [];
  type_id: number = -1;
  termList: Term[] = [];

  constructor(
    private _router: Router,
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _json: JsonConvertionsService
    ) { }

  async ngOnInit() {
    this.user = this._localStorage.getSessionObject("user");
    this.type_id = this.user.type_id;
    this.actionMessage = this._localStorage.getSessionObject("actionMsg");
    this.jobsList = await this._restApi.getJobPostings();
    for (let i = 0; i < this.jobsList.length; i++ ) {
      this.jobsListCourses[i] = await this._restApi.getCourse(this.jobsList[i].course_id);
    }
    this.termList = await this._restApi.getListTerms();
  }

  getTermName(term_id: number): string {
    let termName = "";
    // @ts-ignore
    this.termList.forEach((term) => {
      if (term.term_id == term_id) {
        termName = term.term_name;
      }
    });
    return termName;
  }

  logout() {
    this._localStorage.logout();
    this._router.navigate(['home']);
  }
}
