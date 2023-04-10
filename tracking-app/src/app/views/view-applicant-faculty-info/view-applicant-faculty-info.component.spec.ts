import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicantFacultyInfoComponent } from './view-applicant-faculty-info.component';

describe('ViewApplicantFacultyInfoComponent', () => {
  let component: ViewApplicantFacultyInfoComponent;
  let fixture: ComponentFixture<ViewApplicantFacultyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApplicantFacultyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApplicantFacultyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
