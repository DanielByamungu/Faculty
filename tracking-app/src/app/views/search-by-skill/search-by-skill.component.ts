import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Skill } from 'src/models/skills/skill.model';
import {PersistenceService} from "../../services/persistence.service";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Coordinator} from "../../../models/users/coordinator.model";
import {SkillRanking} from "../../../models/skills/skill_ranking.model";
import {Faculty} from "../../../models/users/faculty.model";
import {Applicant} from "../../../models/users/applicant.model";

class ShowSkill {
}

class Ranking {
}

@Component({
  selector: 'app-search-by-skill',
  templateUrl: './search-by-skill.component.html',
  styleUrls: ['./search-by-skill.component.css'],
})
export class SearchBySkillComponent implements OnInit {
  public user: Coordinator = new Coordinator();
  public skills: Skill[] = [];
  public skillRankings: SkillRanking[] = [];
  public displaySkills: ShowSkill[] = [];
  public rankings: Ranking[] = [];
  public isFaculty: boolean = false;
  facultyList: Faculty[] = [];
  applicantList: Faculty[] = [];

  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _json: JsonConvertionsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
  }

  async ngOnInit() {
    this.user = this._localStorage.getSessionObject("user");
    this.skillRankings = await this._restApi.getRankings();
    this.skills = await this._restApi.getAllSkills();

    for (let i = 0; i < this.skills.length; i++) {
      let controlName = this.skills[i].skill_name.replace(/\s/g, "").toLowerCase();
      controlName = controlName.replace(/&/g, "");
      controlName = controlName.replace(/\+/g, "p");
      controlName = controlName.replace(/#/g, "sharp");
      controlName = controlName.replace(/\//g, "");
      this.displaySkills[i] = {
        name: this.skills[i].skill_name,
        controlName: controlName,
        skill_id: this.skills[i].skill_id
      };
    }
    let y = 0;
    for (let x = 0; x < this.skillRankings.length; x++) {
      if (y > 3) {
        y = 0;
      }
      this.rankings[x] = {
        id: this.skillRankings[y].ranking_id - 1,
        ranking: this.skillRankings[y].ranking
      };
      y++
    }
  }

  async searchFor(applicant: HTMLInputElement, faculty: HTMLInputElement, skill_id: HTMLSelectElement, ranking_id: HTMLSelectElement) {
    console.log("Skill ID: " + skill_id.value);
    console.log("Ranking ID: " + ranking_id.value);
    this.isFaculty = faculty.checked;
    if (this.isFaculty) {
      this.facultyList = await this._restApi.getFacultyBySKill(parseInt(skill_id.value), parseInt(ranking_id.value) + 1);
      console.log("TABLE LIST " + this._json.toJSON(this.facultyList));
      this._router.navigate(['/search-by-skill']);
    }
    if (!this.isFaculty) {
      this.applicantList = await this._restApi.getApplicantBySKill(parseInt(skill_id.value), parseInt(ranking_id.value ) + 1);
    }
  }

}
interface ShowSkill {
  name: string;
  controlName: string;
  skill_id: number
}

interface Ranking {
  id: number;
  ranking: string;
}
