export class FacultyRanking {
  ranking_id: number;
  u_id: number;
  ranking_value: number;


  constructor(ranking_id: number, u_id: number, ranking_value: number) {
    this.ranking_id = ranking_id;
    this.u_id = u_id;
    this.ranking_value = ranking_value;
  }
}
