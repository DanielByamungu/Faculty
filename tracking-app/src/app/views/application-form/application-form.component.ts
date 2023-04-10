import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Applicant } from "../../../models/users/applicant.model";
import { Application } from "../../../models/jobs/application.model";
import { JsonConvertionsService } from "../../services/json-convertions.service";
import { PersistenceService } from "../../services/persistence.service";
import { RestApiService } from "../../services/rest-api.service";
import { LoginComponent } from "../login/login.component";
import {Skill} from "../../../models/skills/skill.model";
import {SkillRanking} from "../../../models/skills/skill_ranking.model";
import {ValidationService} from "../../services/validation.service";
import {ApplicantSkills} from "../../../models/skills/applicant_skills.model";

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

  user_type: number = -1;
  errorMessage: any = "";
  isError: boolean = false;
  user: Applicant = new Applicant();
  today: Date = new Date();
  application: Application = new Application();
  resumeFile: File | null = null;
  newSkill: ApplicantSkills | null = null;

  public allSkills: Skill[] = [];
  public allRankings: SkillRanking[] = [];
  public skills: Course[] = [];
  public rankings: Ranking[] = [];


  getJobId(): number {
    let id: number;
    this._getUrl.params.subscribe(params => {
      id = params['job_id'];
    });
    // @ts-ignore
    return id;
  }

  async ngOnInit() {
    this.user = this._persistence.getSessionObject("user");
    this.user_type = this._persistence.getSessionObject("user").type_id;
    this.allRankings = await this._restApi.getRankings();
    this.allSkills = await this._restApi.getAllSkills();

    for (let i = 0; i < this.allSkills.length; i++) {
      let controlName = this.allSkills[i].skill_name.replace(/\s/g, "").toLowerCase();
      controlName = controlName.replace(/&/g, "");
      controlName = controlName.replace(/\+/g, "p");
      controlName = controlName.replace(/#/g, "sharp");
      controlName = controlName.replace(/\//g, "");
      this.skills[i] = {
        name: this.allSkills[i].skill_name,
        controlName: controlName,
        skill_id: this.allSkills[i].skill_id
      };
    }
    let y = 0;
    for (let x = 0; x < this.allSkills.length; x++) {
      if (y > 3) {
        y = 0;
      }
      this.rankings[x] = {
        id: this.allRankings[y].ranking_id-1,
        ranking: this.allRankings[y].ranking
      };
      y++
    }
  }

constructor(
    private _login: LoginComponent,
    private _router: Router,
    private _convertJson: JsonConvertionsService,
    private _getUrl: ActivatedRoute,
    private _persistence: PersistenceService,
    private _restApi: RestApiService,
    private _validate: ValidationService,
  ) {
  }

  jobApplicationForm = new FormGroup({
    jobId: new FormControl(this.getJobId()),
    userId: new FormControl(this._persistence.getSessionObject('user').u_id),
    firstName: new FormControl(),
    lastName: new FormControl(),
    mobilePhone: new FormControl(),
    homePhone: new FormControl(),
    termsAgreement: new FormControl(),
    term: new FormControl(),
    vacation: new FormControl(),
    waterlooCampus: new FormControl(),
    guelphCampus: new FormControl(),
    ontario: new FormControl(),
    amountOfHours: new FormControl(),

    // #region Table Values
    embeddedsystems: new FormControl("1"),
    operatingsystems: new FormControl("1"),
    cybersecurity: new FormControl("1"),
    projectmanagement: new FormControl("1"),
    advancedmath: new FormControl("1"),
    programming: new FormControl("1"),
    datascience: new FormControl("1"),
    softwareengineering: new FormControl("1"),
    itservicemanagement: new FormControl("1"),
    computerhardware: new FormControl("1"),
    databaseadminsql: new FormControl("1"),
    capstoneprojectmentor: new FormControl("1"),
    java: new FormControl("1"),
    cpp: new FormControl("1"),
    c: new FormControl("1"),
    csharp: new FormControl("1"),
    r: new FormControl("1"),
    azure: new FormControl("1"),
    webtechnologies: new FormControl("1"),
    iosdevelopment: new FormControl("1"),
    androiddevelopment: new FormControl("1"),
    artificialintelligence: new FormControl("1"),
    machinelearning: new FormControl("1"),
    uxui: new FormControl("1"),
    comments: new FormControl(),
  });
  // #endregion

  async onSubmit() {
    this.isError = false;
    this.errorMessage = "";
    let input = (<HTMLInputElement>document.getElementById('homePhone'));
    input.className = "";
    input = (<HTMLInputElement>document.getElementById('mobilePhone'));
    input.className = "";
    //#region Application Field Variables
    let job_id = Number.parseInt(String(this.jobApplicationForm.get('jobId')?.value));
    let agreeTerms = this.jobApplicationForm.get('termsAgreement')?.touched;
    let first_name = this.jobApplicationForm.get('firstName')?.value;
    let last_name = this.jobApplicationForm.get('lastName')?.value;
    let term_available = this.jobApplicationForm.get('term')?.value;
    let vacation = this.jobApplicationForm.get('vacation')?.value;
    let waterloo = this.jobApplicationForm.get('waterlooCampus')?.value;
    let guelph = this.jobApplicationForm.get('guelphCampus')?.value;
    let reside_ontario = this.jobApplicationForm.get('ontario')?.value;
    let max_hrs = this.jobApplicationForm.get('amountOfHours')?.value;
    let embeddedSystem = <string>this.jobApplicationForm.get('embeddedsystems')?.value;
    let operatingSystems = this.jobApplicationForm.get('operatingsystems')?.value;
    let cybersecurity = this.jobApplicationForm.get('cybersecurity')?.value;
    let projectManagement = this.jobApplicationForm.get('projectmanagement')?.value;
    let advancedMath = this.jobApplicationForm.get('advancedmath')?.value;
    let programming = this.jobApplicationForm.get('programming')?.value;
    let dataScience = this.jobApplicationForm.get('datascience')?.value;
    let softwareEngineering = this.jobApplicationForm.get('softwareengineering')?.value;
    let itServiceManagement = this.jobApplicationForm.get('itservicemanagement')?.value;
    let computerHardware = this.jobApplicationForm.get('computerhardware')?.value;
    let databaseAdminSQL = this.jobApplicationForm.get('databaseadminsql')?.value;
    let capstoneProjectMentor = this.jobApplicationForm.get('capstoneprojectmentor')?.value;
    let java = this.jobApplicationForm.get('java')?.value;
    let cpp = this.jobApplicationForm.get('cpp')?.value;
    let c = this.jobApplicationForm.get('c')?.value;
    let csharp = this.jobApplicationForm.get('csharp')?.value;
    let r = this.jobApplicationForm.get('r')?.value;
    let azure = this.jobApplicationForm.get('azure')?.value;
    let webTechnologies = this.jobApplicationForm.get('webtechnologies')?.value;
    let iosDevelopment = this.jobApplicationForm.get('iosdevelopment')?.value;
    let androidDevelopment = this.jobApplicationForm.get('androiddevelopment')?.value;
    let artificialIntelligence = this.jobApplicationForm.get('artificialintelligence')?.value;
    let machineLearning = this.jobApplicationForm.get('machinelearning')?.value;
    let uxUI = this.jobApplicationForm.get('uxui')?.value;
    let comments = this.jobApplicationForm.get('comments')?.value;
    let homePhone = this.jobApplicationForm.get('homePhone')?.value;
    let mobilePhone = this.jobApplicationForm.get('mobilePhone')?.value;
    if (!agreeTerms) {
      this.isError = true;
      this.errorMessage += "You must agree to Terms above!\n";
      this._router.navigate([`application-form/${job_id}`]);
    }
    if (first_name === null || !this._validate.checkName(first_name)) {
      this.isError = true;
      this.errorMessage += "Invalid Name! Please enter a valid name!";
      let input = (<HTMLInputElement>document.getElementById('firstName'));
      input.className = "input-validation-error";
      this._router.navigate(['application-form/' + job_id]);
    } else if (last_name === null || !this._validate.checkName(last_name)) {
      this.isError = true;
      this.errorMessage += "Invalid Name! Please enter a valid name!";
      let input = (<HTMLInputElement>document.getElementById('lastName'));
      input.className = "input-validation-error";
      this._router.navigate(['application-form/' + job_id]);
    }
    if (homePhone === null && mobilePhone === null) {
      this.isError = true;
      this.errorMessage += "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
      let input = (<HTMLInputElement>document.getElementById('homePhone'));
      input.className = "input-validation-error";
      this._router.navigate(['application-form/' + job_id]);
    } else {
      if (homePhone !== null && mobilePhone === null) {
        if (!this._validate.checkPhone(homePhone)) {
          this.isError = true;
          this.errorMessage += "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
          let input = (<HTMLInputElement>document.getElementById('homePhone'));
          input.className = "input-validation-error";
          this._router.navigate(['application-form/' + job_id]);
        }
      } else if (mobilePhone !== null && homePhone === null) {
        if (!this._validate.checkPhone(mobilePhone)) {
          this.isError = true;
          this.errorMessage += "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
          let input = (<HTMLInputElement>document.getElementById('mobilePhone'));
          input.className = "input-validation-error";
          this._router.navigate(['application-form/' + job_id]);
        }
      } else if (homePhone !== null && mobilePhone !== null) {
        if (!this._validate.checkPhone(homePhone) && !this._validate.checkPhone(mobilePhone)) {
          this.isError = true;
          this.errorMessage += "Invalid Phone #! Please enter a valid Phone # \n(555)555-5555 OR \n(123) 123-1234\n";
          let input = (<HTMLInputElement>document.getElementById('homePhone'));
          input.className = "input-validation-error";
          input = (<HTMLInputElement>document.getElementById('mobilePhone'));
          input.className = "input-validation-error";
          this._router.navigate(['application-form/' + job_id]);
        }
      }
    }
    //#endregion

    if (!this.isError) {
      //#region application setting parameters
      this.application.available_in_person_guelph = guelph == "yes";
      this.application.available_in_person_waterloo = waterloo == "yes";
      this.application.available_term = term_available == "yes";
      this.application.comments = comments;
      this.application.date_created = this.today;
      this.application.hrs_week = max_hrs;
      this.application.job_id = job_id;
      this.application.residing_ontario = reside_ontario == "yes";
      this.application.s_id = 2;
      this.application.u_id = this.user.u_id;
      this.application.vacation_planned = vacation == "yes";
      //#endregion

      this.user.full_name = first_name.trim().toUpperCase() + " " + last_name.trim().toUpperCase();;
      this.user.mobile_phone = mobilePhone;
      this.user.home_phone = homePhone;
      this._restApi.postFetch(this.user, "/applicants/" + this.user.u_id, "put");

      await this.deleteAllApplicantSkills();
      this.allSkills.forEach((skill) => {
        switch (skill.skill_name.toUpperCase()) {
          case 'EMBEDDED SYSTEMS':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(embeddedSystem));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'OPERATING SYSTEMS':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>operatingSystems));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'CYBER SECURITY':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>cybersecurity));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'PROJECT MANAGEMENT':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>projectManagement));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'ADVANCED MATH':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>advancedMath));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'PROGRAMMING':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>programming));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'DATA SCIENCE':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>dataScience));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'SOFTWARE ENGINEERING':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>softwareEngineering));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'IT SERVICE MANAGEMENT':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>itServiceManagement));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'COMPUTER HARDWARE':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>computerHardware));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'DATABASE ADMIN & SQL':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>databaseAdminSQL));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'CAPSTONE PROJECT MENTOR':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>capstoneProjectMentor));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'JAVA':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>java));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'C++':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>cpp));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'C':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>c));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'C#':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>csharp));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'R':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>r));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'AZURE':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>azure));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'WEB TECHNOLOGIES':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>webTechnologies));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'IOS DEVELOPMENT':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>iosDevelopment));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'ANDROID DEVELOPMENT':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>androidDevelopment));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'ARTIFICIAL INTELLIGENCE':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>artificialIntelligence));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'MACHINE LEARNING':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>machineLearning));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

          case 'UX/UI':
            this.newSkill = new ApplicantSkills(skill.skill_id, this.user.u_id, parseInt(<string>uxUI));
            this._restApi.postFetch(this.newSkill, "/applicantskills", "post");
            break;

        }
      })
      // Should handle it not working??

      this._restApi.postFetch(this.application, "/applications", "post");
      this._router.navigate(['add-availability']);
    }
  }

  public logOut() {
    this._persistence.logout();
    this._router.navigate(['home']);
    console.log("LOGGED OUT!!!!");
  }

  async deleteAllApplicantSkills() {
    for (let x = 0; x < this.allSkills.length; x++) {
      await this._restApi.deleteFetch(`/applicantskills/delete?skill_id=${this.allSkills[x].skill_id}&u_id=${this.user.u_id}`);
    }
  }
}

interface Course {
  name: string;
  controlName: string;
  skill_id: number
}

interface Ranking {
  id: number;
  ranking: string;
}



