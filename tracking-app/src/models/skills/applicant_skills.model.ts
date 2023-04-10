export class ApplicantSkills {
  skill_id: number;
  u_id: number;
  ranking_id: number;


  constructor(skill_id: number, u_id: number, ranking_id: number) {
    this.skill_id = skill_id;
    this.u_id = u_id;
    this.ranking_id = ranking_id;
  }
}
