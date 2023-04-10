import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {ActivatedRoute, Router} from "@angular/router";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import {PersistenceService} from "../../services/persistence.service";
import {RestApiService} from "../../services/rest-api.service";
import {Coordinator} from "../../../models/users/coordinator.model";
import {Admin} from "../../../models/users/admin.model";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {Applicant} from "../../../models/users/applicant.model";
import {Course} from "../../../models/course/course.model";
import {JobPosting} from "../../../models/jobs/job_posting.model";
import {Application} from "../../../models/jobs/application.model";
import {Faculty} from "../../../models/users/faculty.model";
import {Program} from "../../../models/course/program.model";
import {Term} from "../../../models/course/term.model";
import {Status} from "../../../models/jobs/status.model";
import {Skill} from "../../../models/skills/skill.model";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  // -- delete/:previousPage/:table/:id

  constructor(
    private _login: LoginComponent,
    private _router: Router,
    private _convertJson: JsonConvertionsService,
    private _getUrl: ActivatedRoute,
    private _persistence: PersistenceService,
    private _restApi: RestApiService,
  ) {
  }

  user: Coordinator | Admin = new Coordinator();
  previousPage: string = "";
  table: string = "";
  objectId: number = -1;
  terms: Term[] = [];
  deleteCourse: Course = new Course();
  deleteJobPosting: JobPosting = new JobPosting(-1, -1);
  showJobPosting: Course = new Course();
  deleteApplication: Application = new Application();
  deleteFaculty: Faculty = new Faculty();
  deleteApplicant: Applicant = new Applicant();
  deleteProgram: Program = new Program();
  getUser: Faculty | Applicant = new Applicant();
  getCourse: Course = new Course();
  getStatus: Status = new Status();
  allSkills: Skill[] = [];

  async ngOnInit() {
    this.user = await this._persistence.getSessionObject('user');
    this.previousPage = <string>this._getUrl.snapshot.paramMap.get('previousPage');
    this.table = <string>this._getUrl.snapshot.paramMap.get("table")?.toUpperCase().trim();
    this.objectId = Number(this._getUrl.snapshot.paramMap.get('id'));
    this.terms = await this._restApi.getListTerms();
    this.allSkills = await this._restApi.getAllSkills();
    switch (this.table) {
      case "COURSES" :
        this.deleteCourse = await this._restApi.getCourse(this.objectId);
        break;

      case "JOBPOSTINGS":
        this.deleteJobPosting = await this._restApi.getPostingById(this.objectId);
        this.showJobPosting = await this._restApi.getCourse(this.deleteJobPosting.course_id);
        break;

      case "APPLICATIONS":
        this.deleteApplication = await this._restApi.getApplicationById(this.objectId);
        console.log("Application: " + this._convertJson.toJSON(this.deleteApplication));
        setTimeout(() => {
          this.getUserMethod(this.deleteApplication.u_id)
        }, 2000);
        this.getUser =  await this._restApi.getApplicantById(this.deleteApplication.u_id);
        if (this.getUser == null) {
          this.getUser =  await this._restApi.getFacultyById(this.deleteApplication.u_id);
        }
        let job =  await this._restApi.getPostingById(this.deleteApplication.job_id);
        this.getCourse =  await this._restApi.getCourse(job.course_id);
        this.getStatus = await this._restApi.getStatusById(this.deleteApplication.s_id);
        break;

      case "FACULTY":
        this.deleteFaculty = await this._restApi.getFacultyById(this.objectId);
        break;

      case "APPLICANTS":
        this.deleteApplicant = await this._restApi.getApplicantById(this.objectId);
        break;

      case "PROGRAMS":
        break;

      case "TERMS":
        break;

      case "SKILLS":
        break;

    }
  }

  navigateBackToPage() {
    this._router.navigate([this.previousPage]);
  }

  async deleteObject(object: string) {
    switch (object.trim().toUpperCase()) {
      case "COURSE" :
        await this._restApi.deleteFetch(`/courses/${this.objectId}`);
        await this._router.navigate([this.previousPage]).then(() => {
          location.reload();
        });
        break;

      case "JOBPOSTING":
        let applications = await this._restApi.getAllApplicationByJobId(this.objectId);
        applications.forEach((app) => {
          this._restApi.deleteFetch(`/applications/${app.app_id}`);
        });
        await this._restApi.deleteFetch(`/jobpostings/${this.objectId}`);
        await this._router.navigate([this.previousPage]).then(() => {
          location.reload();
        });
        break;

      case "APPLICATION":
        await this._restApi.deleteFetch(`/applications/${this.objectId}`);
        await this._router.navigate([this.previousPage]).then(() => {
          location.reload();
        });
        break;

      case "FACULTY":
        for (const skill of this.allSkills) {
          await this._restApi.deleteFetch(`/facultyskills/delete?skill_id=${skill.skill_id}&u_id=${this.objectId}`);
        }
        await this._restApi.deleteFetch(`/coursestaught/${this.objectId}`)
        await this._restApi.deleteFetch(`/applications/deleteBy/${this.objectId}`)
        await this._restApi.deleteFetch(`/facultyavailability/${this.objectId}`);
        await this._restApi.deleteFetch(`/faculty/${this.objectId}`);
        await this._router.navigate([this.previousPage]).then(() => {
          location.reload();
        });
        break;

      case "APPLICANT":
        for (const skill of this.allSkills) {
          await this._restApi.deleteFetch(`/applicantskills/delete?skill_id=${skill.skill_id}&u_id=${this.objectId}`);
        }
        await this._restApi.deleteFetch(`/applications/deleteBy/${this.objectId}`)
        await this._restApi.deleteFetch(`/applicantavailability/delete/${this.objectId}`);
        await this._restApi.deleteFetch(`/applicants/${this.objectId}`);
        await this._router.navigate([this.previousPage]).then(() => {
          location.reload();
        });
        break;

      case "PROGRAM":
        break;

      case "TERM":
        break;

      case "SKILL":
        break;
    }
  }

  async getUserMethod(id: number) {
    this.getUser = await this._restApi.getApplicantById(id);
    if (this.getUser == null) {
      this.getUser = await this._restApi.getFacultyById(id);
    }
  }


  public getTermName(id: number | undefined): string {
    for (let i = 0; i < this.terms.length; i++) {
      if (this.terms[i].term_id == id) {
        return <string>this.terms[i].term_name;
      } else {
        continue;
      }
    }
    return "Error";
  }

}

