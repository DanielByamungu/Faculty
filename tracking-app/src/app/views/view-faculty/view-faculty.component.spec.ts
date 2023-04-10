import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistenceService } from 'src/app/services/persistence.service';
import { Applicant } from 'src/models/users/applicant.model';
import { ViewFacultyComponent } from './view-faculty.component';

describe('ViewFacultyComponent', () => {
  let component: ViewFacultyComponent;
  let fixture: ComponentFixture<ViewFacultyComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFacultyComponent ],
      providers: [{useClass: PersistenceService}]
    })
    .compileComponents();

    let user: Applicant = {
      type_id: 1,
      full_name: "testing",
      home_phone: "(515) 111-1111",
      mobile_phone: "(225) 111-1111",
      email: "test@gmail.com",
      pswrd: "testing",
      loggedIn: false,
      u_id: 1,
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    fixture = TestBed.createComponent(ViewFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
