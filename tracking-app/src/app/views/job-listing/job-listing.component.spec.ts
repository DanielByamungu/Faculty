import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListingComponent } from './job-listing.component';

describe('JobListingComponent', () => {
  let component: JobListingComponent;
  let fixture: ComponentFixture<JobListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobListingComponent ],
    })
    .compileComponents();

    let user = {
      app_id: 1,
      type_id: 1,
      email: "test@gmail.com",
      pswrd: "testing",
      loggedIn: false,
      u_id: 1,
      r_id: -1
    }

    sessionStorage.setItem("user", JSON.stringify(user));

    fixture = TestBed.createComponent(JobListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
