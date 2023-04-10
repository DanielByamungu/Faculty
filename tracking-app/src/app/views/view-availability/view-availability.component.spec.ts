import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAvailabilityComponent } from './view-availability.component';
import { RouterModule } from '@angular/router';

describe('ViewAvailabilityComponent', () => {
  let component: ViewAvailabilityComponent;
  let fixture: ComponentFixture<ViewAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAvailabilityComponent],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

     let user = {
       app_id: 1,
       type_id: 1,
       email: 'test@gmail.com',
       pswrd: 'testing',
       loggedIn: false,
       u_id: 1,
       r_id: -1,
     };
     sessionStorage.setItem('user', JSON.stringify(user));

    fixture = TestBed.createComponent(ViewAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
