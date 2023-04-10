export class Rating {
  rating_id: number | undefined = -1;
  u_id: number | undefined = -1;
  rating_value: number | undefined = -1;


  constructor(rating_id?: number, u_id?: number, rating_value?: number) {
    this.rating_id = rating_id;
    this.u_id = u_id;
    this.rating_value = rating_value;
  }
}
