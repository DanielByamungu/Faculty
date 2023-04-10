import { User } from './user.model';

export class Faculty implements User {
  email: string = '';
  loggedIn: boolean = false;
  pswrd: string = '';
  type_id: number = -1;
  u_id: number = -1;
  hire_date: Date = new Date('0001-01-01'); // Date.parse(hire_date) == 978307198000 <-- This is the check value
  full_name: string = '';
  home_phone: string = '';
  mobile_phone: string = '';
  rating_avg: number = 0.0;

  constructor(email?: string, pswrd?: string, type_id?: number, u_id?: number, hire_date?: Date, full_name?: string, avgRating?: number) {
    this.email = <string>email;
    this.pswrd = <string>pswrd;
    this.type_id = <number>type_id;
    this.u_id = <number>u_id;
    this.hire_date = <Date>hire_date;
    this.full_name = <string>full_name;
    this.rating_avg = <number>avgRating;
  }
}

export default function calculateAvgRating(ratings: number[]): number {
  let avg: number = 0;
  let total: number = 0;
  ratings.forEach((rating) => {
    total += rating;
  });
  avg = total / ratings.length;
  return avg;
}
