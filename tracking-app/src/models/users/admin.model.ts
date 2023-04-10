import {User} from "./user.model";

export class Admin implements User {
  email: string = "";
  loggedIn: boolean = false;
  pswrd: string = "";
  type_id: number = -1;
  u_id: number = -1;

  constructor(email?: string, loggedIn?: boolean, password?: string, type_id?: number, u_id?: number) {
    // @ts-ignore
    this.email = email;
    // @ts-ignore
    this.loggedIn = loggedIn;
    // @ts-ignore
    this.pswrd = password;
    // @ts-ignore
    this.type_id = type_id;
    // @ts-ignore
    this.u_id = u_id;
  }
}
