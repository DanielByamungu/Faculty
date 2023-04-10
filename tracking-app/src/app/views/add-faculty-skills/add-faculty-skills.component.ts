import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Skill} from '../../../models/skills/skill.model';
import {SkillRanking} from '../../../models/skills/skill_ranking.model';
import {Coordinator} from '../../../models/users/coordinator.model';
import {JsonConvertionsService} from '../../services/json-convertions.service';
import {PersistenceService} from '../../services/persistence.service';
import {RestApiService} from '../../services/rest-api.service';
import {Faculty} from "../../../models/users/faculty.model";
import {ApplicantSkills} from "../../../models/skills/applicant_skills.model";
import {FacultySkill} from "../../../models/skills/faculty_skills.model";

@Component({
  selector: 'app-add-faculty-skills',
  templateUrl: './add-faculty-skills.component.html',
  styleUrls: ['./add-faculty-skills.component.css'],
})
export class AddFacultySkillsComponent implements OnInit {
  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _json: JsonConvertionsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
  }

  public user: Coordinator = new Coordinator();
  public skills: Skill[] = [];
  public skillRankings: SkillRanking[] = [];
  public displaySkills: ShowSkill[] = [];
  public rankings: Ranking[] = [];
  public allFaculty: Faculty[] = [];
  isError: boolean = false;
  public errorMessage: string = "";
  newSkill: FacultySkill = new FacultySkill(-1, -1, -1);


  async ngOnInit() {
    this.user = this._localStorage.getSessionObject('user');
    this.skillRankings = await this._restApi.getRankings();
    this.skills = await this._restApi.getAllSkills();
    this.allFaculty = await this._restApi.getListFaculty();

    for (let i = 0; i < this.skills.length; i++) {
      let controlName = this.skills[i].skill_name
        .replace(/\s/g, '')
        .toLowerCase();
      controlName = controlName.replace(/&/g, '');
      controlName = controlName.replace(/\+/g, 'p');
      controlName = controlName.replace(/#/g, 'sharp');
      controlName = controlName.replace(/\//g, '');
      this.displaySkills[i] = {
        name: this.skills[i].skill_name,
        controlName: controlName,
        skill_id: this.skills[i].skill_id,
      };
      this.skills[i].skill_name = this.skills[i].skill_name.trim();
    }
    let y = 0;
    for (let x = 0; x < this.skillRankings.length; x++) {
      if (y > 3) {
        y = 0;
      }
      this.rankings[x] = {
        id: this.skillRankings[y].ranking_id - 1,
        ranking: this.skillRankings[y].ranking,
      };
      y++;
    }
  }

  facultySkillsForm = new FormGroup({
    user: new FormControl('0'),
    embeddedsystems: new FormControl('1'),
    operatingsystems: new FormControl('1'),
    cybersecurity: new FormControl('1'),
    projectmanagement: new FormControl('1'),
    advancedmath: new FormControl('1'),
    programming: new FormControl('1'),
    datascience: new FormControl('1'),
    softwareengineering: new FormControl('1'),
    itservicemanagement: new FormControl('1'),
    computerhardware: new FormControl('1'),
    databaseadminsql: new FormControl('1'),
    capstoneprojectmentor: new FormControl('1'),
    java: new FormControl('1'),
    cpp: new FormControl('1'),
    c: new FormControl('1'),
    csharp: new FormControl('1'),
    r: new FormControl('1'),
    azure: new FormControl('1'),
    webtechnologies: new FormControl('1'),
    iosdevelopment: new FormControl('1'),
    androiddevelopment: new FormControl('1'),
    artificialintelligence: new FormControl('1'),
    machinelearning: new FormControl('1'),
    uxui: new FormControl('1'),
  });

  async onSubmit() {
    this.isError = false;
    let facultyMember = this.facultySkillsForm.get('user')?.value;
    let embeddedSystem = <string>this.facultySkillsForm.get('embeddedsystems')?.value;
    let operatingSystems = this.facultySkillsForm.get('operatingsystems')?.value;
    let cybersecurity = this.facultySkillsForm.get('cybersecurity')?.value;
    let projectManagement = this.facultySkillsForm.get('projectmanagement')?.value;
    let advancedMath = this.facultySkillsForm.get('advancedmath')?.value;
    let programming = this.facultySkillsForm.get('programming')?.value;
    let dataScience = this.facultySkillsForm.get('datascience')?.value;
    let softwareEngineering = this.facultySkillsForm.get('softwareengineering')?.value;
    let itServiceManagement = this.facultySkillsForm.get('itservicemanagement')?.value;
    let computerHardware = this.facultySkillsForm.get('computerhardware')?.value;
    let databaseAdminSQL = this.facultySkillsForm.get('databaseadminsql')?.value;
    let capstoneProjectMentor = this.facultySkillsForm.get('capstoneprojectmentor')?.value;
    let java = this.facultySkillsForm.get('java')?.value;
    let cpp = this.facultySkillsForm.get('cpp')?.value;
    let c = this.facultySkillsForm.get('c')?.value;
    let csharp = this.facultySkillsForm.get('csharp')?.value;
    let r = this.facultySkillsForm.get('r')?.value;
    let azure = this.facultySkillsForm.get('azure')?.value;
    let webTechnologies = this.facultySkillsForm.get('webtechnologies')?.value;
    let iosDevelopment = this.facultySkillsForm.get('iosdevelopment')?.value;
    let androidDevelopment = this.facultySkillsForm.get('androiddevelopment')?.value;
    let artificialIntelligence = this.facultySkillsForm.get('artificialintelligence')?.value;
    let machineLearning = this.facultySkillsForm.get('machinelearning')?.value;
    let uxUI = this.facultySkillsForm.get('uxui')?.value;

    if (facultyMember == '0') {
      this.isError = true;
      this.errorMessage += "You must choose a faculty member!\n";
      let input = (<HTMLInputElement>document.getElementById('user'));
      input.className = "input-validation-error";
      this._router.navigate([`add-faculty-skills`]);
    }

    if (!this.isError) {
      await this.deleteAllFacultySkills(parseInt(<string>facultyMember));
      for (const skill of this.skills) {
        switch (skill.skill_name.toUpperCase().trim()) {
          case 'EMBEDDED SYSTEMS':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(embeddedSystem));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'OPERATING SYSTEMS':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>operatingSystems));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'CYBER SECURITY':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>cybersecurity));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'PROJECT MANAGEMENT':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>projectManagement));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'ADVANCED MATH':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>advancedMath));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'PROGRAMMING':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>programming));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'DATA SCIENCE':
            this.newSkill = new FacultySkill(skill.skill_id, this.user.u_id, parseInt(<string>dataScience));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'SOFTWARE ENGINEERING':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>softwareEngineering));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'IT SERVICE MANAGEMENT':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>itServiceManagement));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'COMPUTER HARDWARE':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>computerHardware));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'DATABASE ADMIN & SQL':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>databaseAdminSQL));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'CAPSTONE PROJECT MENTOR':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>capstoneProjectMentor));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'JAVA':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>java));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'C++':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>cpp));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'C':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>c));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'C#':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>csharp));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'R':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>r));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'AZURE':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>azure));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'WEB TECHNOLOGIES':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>webTechnologies));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'IOS DEVELOPMENT':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>iosDevelopment));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'ANDROID DEVELOPMENT':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>androidDevelopment));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'ARTIFICIAL INTELLIGENCE':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>artificialIntelligence));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'MACHINE LEARNING':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>machineLearning));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;

          case 'UX/UI':
            this.newSkill = new FacultySkill(skill.skill_id, parseInt(<string>facultyMember), parseInt(<string>uxUI));
            this._restApi.postFetch(this.newSkill, "/facultyskills", "post");
            break;
        }
      }
    }
  }

  async deleteAllFacultySkills (u_id: number) {
    for(let x = 0; x < this.skills.length; x++) {
      await this._restApi.deleteFetch(`/facultyskills/delete?skill_id=${this.skills[x].skill_id}&u_id=${u_id}`);
    }
  }
}

interface ShowSkill {
  name: string;
  controlName: string;
  skill_id: number;
}

interface Ranking {
  id: number;
  ranking: string;
}
