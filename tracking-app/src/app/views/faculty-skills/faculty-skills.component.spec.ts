import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySkillsComponent } from './faculty-skills.component';

describe('FacultySkillsComponent', () => {
  let component: FacultySkillsComponent;
  let fixture: ComponentFixture<FacultySkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultySkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
