import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoursesTaughtComponent } from './view-courses-taught.component';
import { RouterModule } from '@angular/router';

describe('ViewCoursesTaughtComponent', () => {
  let component: ViewCoursesTaughtComponent;
  let fixture: ComponentFixture<ViewCoursesTaughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCoursesTaughtComponent ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoursesTaughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
