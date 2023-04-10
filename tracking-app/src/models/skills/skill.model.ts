export class Skill {
  skill_id: number;
  skill_name: string;

  constructor(skill_id: number = -1, skill_name: string = "") {
    this.skill_id = skill_id;
    this.skill_name = skill_name;
  }
}
