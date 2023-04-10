import {User} from "./user.model";

export class Applicant implements User {

  email: string = "";
  loggedIn: boolean = false;
  pswrd: string = "";
  type_id: number = -1;
  u_id: number = -1;
  full_name: string = "";
  home_phone: string = "";
  mobile_phone: string = "";

  constructor() {
  }
}
