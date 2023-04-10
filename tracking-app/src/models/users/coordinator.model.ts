import {User} from "./user.model";

export class Coordinator implements User{
  hire_date: Date = new Date("0001-01-01"); // Date.parse(hire_date) == 978307198000 <-- This is the check value
  pr_id: number;
  email: string;
  loggedIn: boolean;
  pswrd: string;
  type_id: number;
  u_id: number;
  fullName: string = "";


  constructor(hire_date: Date = new Date("0001-01-01"), pr_id: number = 1, email: string = "", loggedIn: boolean = false, pswrd: string = "", type_id: number = -1, u_id: number = -1) {
    this.hire_date = hire_date;
    this.pr_id = pr_id;
    this.email = email;
    this.loggedIn = loggedIn;
    this.pswrd = pswrd;
    this.type_id = type_id;
    this.u_id = u_id;
  }
}
