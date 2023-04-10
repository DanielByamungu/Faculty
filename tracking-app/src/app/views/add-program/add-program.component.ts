import { Component, OnInit } from '@angular/core';
import {Program} from "../../../models/course/program.model";
import {LoginComponent} from "../login/login.component";
import {ActivatedRoute, Router} from "@angular/router";
import {JsonConvertionsService} from "../../services/json-convertions.service";
import {PersistenceService} from "../../services/persistence.service";
import {RestApiService} from "../../services/rest-api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Coordinator} from "../../../models/users/coordinator.model";
import {Admin} from "../../../models/users/admin.model";

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent implements OnInit {
  errorMessage: any;
  isError: boolean = false;
  program: Program = new Program();
  user: Coordinator | Admin = new Coordinator();

  constructor(
    private _login: LoginComponent,
    private _router: Router,
    private _convertJson: JsonConvertionsService,
    private _getUrl: ActivatedRoute,
    private _persistence: PersistenceService,
    private _restApi: RestApiService,
  ) { }

  addProgramForm = new FormGroup({
    programName: new FormControl()
  })

  async ngOnInit() {
    this.user = await this._persistence.getSessionObject('user');
  }


  submit() {
    let programName = this.addProgramForm.get('programName')?.value;
    this.program.pr_name = programName.toUpperCase();
    this._restApi.postFetch(this.program, '/programs', "post");
    this._persistence.saveSessionObject('success', "PROGRAM ADDED SUCCESSFULLY!!");
    this._router.navigate(['/management']);
  }
}
