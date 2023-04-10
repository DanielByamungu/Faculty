import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvailabilityComponent } from './add-availability.component';

describe('AddAvailabilityComponent', () => {
  let component: AddAvailabilityComponent;
  let fixture: ComponentFixture<AddAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAvailabilityComponent ]
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
    fixture = TestBed.createComponent(AddAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
