import {Component, OnInit} from '@angular/core';
import {Skill} from "../../../models/skills/skill.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PersistenceService} from "../../services/persistence.service";
import {RestApiService} from "../../services/rest-api.service";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import {SkillRanking} from "../../../models/skills/skill_ranking.model";
import {Faculty} from "../../../models/users/faculty.model";
import {Applicant} from "../../../models/users/applicant.model";
import {Coordinator} from "../../../models/users/coordinator.model";
import {Admin} from "../../../models/users/admin.model";

@Component({
  selector: 'app-view-skills',
  templateUrl: './view-skills.component.html',
  styleUrls: ['./view-skills.component.css'],
})
export class ViewSkillsComponent implements OnInit {
  public allSkills: Skill[] = [];
  public allRankings: SkillRanking[] = [];
  public userSkills: any[] = [];
  u_id: number = -1;
  type_id: number = -1;
  public user: Coordinator | Admin = new Coordinator();
  table: string = "";
  public skillName: string = "";
  public rankingName: string = "";
  public facultyUser: Faculty = new Faculty();
  public applicantUser: Applicant = new Applicant();
  public userName: string = "";

  constructor(
    private _router: Router,
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _convert: JsonConvertionsService,
    private _activated: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.u_id = Number(this._activated.snapshot.paramMap.get('u_id'));
    this.type_id = Number(this._activated.snapshot.paramMap.get('type_id'));
    this.user = await this._localStorage.getSessionObject('user');
    this.allSkills = await this._restApi.getAllSkills();
    this.allRankings = await this._restApi.getRankings();
    this.userSkills = await this._restApi.getSkillsByUserId(this.u_id, (this.type_id == 4) ? "applicant" : "faculty");
    if (this.type_id == 4) {
      this.applicantUser = await this._restApi.getApplicantById(this.u_id);
      this.userName = this.applicantUser.full_name;
    } else {
      this.facultyUser = await this._restApi.getFacultyById(this.u_id);
      this.userName = this.facultyUser.full_name;
    }
  }

  getSkillName (skill_id: number) {
    for (let i = 0; i < this.allSkills.length; i++) {
      if (this.allSkills[i].skill_id == skill_id) {
        this.skillName = this.allSkills[i].skill_name;
      }
    }
    return this.skillName;
  }

  getRankingName (ranking_id: number) {
    this.allRankings.forEach((rank) => {
      if(rank.ranking_id == ranking_id) {
        this.rankingName = rank.ranking;
      }
    });
    return this.rankingName;
  }
}
