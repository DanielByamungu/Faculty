import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersistenceService } from 'src/app/services/persistence.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Applicant } from 'src/models/users/applicant.model';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css'],
})
export class ViewApplicantsComponent implements OnInit {
  public user: Applicant = new Applicant();
  public applicantList: Applicant[] = [];
  public filterType: string = 'ALL';

  constructor(
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.user = this._localStorage.getSessionObject('user');
    this.applicantList = await this._restApi.getUsers('applicants', 4);
  }

  async filterTable(filterBy: HTMLInputElement, type: string) {
    this.filterType = type;
    let url: string = '';
    if (type === 'NAME') {
      let fName = filterBy.value.toUpperCase().trim();
      url = `applicants/getByName/${fName}`;
      this.applicantList = [];
      this.applicantList = await this._restApi.getApplicantByName(url);
      await this._router.navigate(['view-applicants']);
    }
    if (type === 'EMAIL') {
      let email = filterBy.value.trim();
      url = `faculty/byemail/${email}`;
      this.applicantList = [];
      // TODO: Replace with applicant version
      // this.applicantList[0] = await this._restApi.getFacultyByEmail(url);
      await this._router.navigate(['view-applicants']);
    }
  }
}
