import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PersistenceService} from "../../services/persistence.service";
import {RestApiService} from "../../services/rest-api.service";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import {Applicant} from "../../../models/users/applicant.model";
import {Application} from "../../../models/jobs/application.model";
import {Course} from "../../../models/course/course.model";
import {Status} from "../../../models/jobs/status.model";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.css']
})
export class AllApplicationsComponent implements OnInit {
  public user: Applicant = new Applicant();
  errorMessage: any;
  isError: boolean = false;
  filterType: string = "ALL";
  applications: Application[] = [];
  appStatus: Status[] = [];
  courseName: Course[] = [];
  applicantNames: Applicant[] = [];
  statusList: Status[] = [];

  constructor(
    private _router: Router,
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _convert: JsonConvertionsService
  ) { }

  async ngOnInit() {
    this.user = await this._localStorage.getSessionObject("user");
    this.applications = await this._restApi.getAllApplications();
    let i = 0;
    for (const app of this.applications) {
      this.appStatus[i] = await this._restApi.getStatusById(app.s_id);
      let job = await this._restApi.getPostingById(app.job_id);
      this.courseName[i] = await this._restApi.getCourse(job.course_id);
      this.applicantNames[i] = await this._restApi.getApplicantById(app.u_id);
      i++;
    }
    this.statusList = await this._restApi.getListStatus();
  }

  logout() {
    this._localStorage.logout();
    this._router.navigate(['home']);
  }

  async onChange(applicationStatus: NgModel, app_id: any) {
    let application = await this._restApi.getApplicationById(app_id);
    application.s_id = applicationStatus.value;
    this._restApi.postFetch(application, '/applications/' + application.app_id, 'put')
  }
}
