import {Component, OnInit} from '@angular/core';
import {Program} from "../../../models/course/program.model";
import {Coordinator} from "../../../models/users/coordinator.model";
import {Router} from "@angular/router";
import {PersistenceService} from "../../services/persistence.service";
import {RestApiService} from "../../services/rest-api.service";
import {JsonConvertionsService} from "../../services/json-convertions.service";

interface TableObject {
  program_name: string | undefined;
  coord_name: string | undefined;
}

@Component({
  selector: 'app-view-programs',
  templateUrl: './view-programs.component.html',
  styleUrls: ['./view-programs.component.css']
})
export class ViewProgramsComponent implements OnInit {
  errorMessage: any;
  isError: boolean = false;
  u_id: number = -1;
  type_id: number = 2;
  programs: Array<Program> = new Array<Program>();
  coordinators: Array<Coordinator> = new Array<Coordinator>();
  tableArray: Array<TableObject> = new Array<TableObject>();

  constructor(
    private _router: Router,
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _convert: JsonConvertionsService
  ) {
  }

  async ngOnInit() {
    this.programs = await this.getPrograms();
    this.coordinators = await this.getCoords();
    for (let i = 0; i < this.programs.length; i++) {
      this.tableArray[i] = {
        program_name: this.programs[i].pr_name,
        coord_name: this.getCoordName(this.programs[i].pr_id)
      };
    }
  }

  async getPrograms(): Promise<Array<Program>> {
    return await this._restApi.getListPrograms();
  }

  async getCoords(): Promise<Array<Coordinator>> {
    return await this._restApi.getListCoords();
  }

  private getCoordName(pr_id: number): string {
    for (let i = 0; i < this.coordinators.length; i++) {
      if (this.coordinators[i].pr_id == pr_id) {
        return <string>this.coordinators[i].email;
      } else {
        continue;
      }
    }
    return "N/A";
  }

  logout() {
    this._localStorage.logout();
    this._router.navigate(['home']);
  }

  deleteProgram(programName: string) {

  }

}
