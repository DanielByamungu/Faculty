import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSkillsComponent } from './view-skills.component';
import { RouterModule } from '@angular/router';

describe('ViewSkillsComponent', () => {
  let component: ViewSkillsComponent;
  let fixture: ComponentFixture<ViewSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSkillsComponent ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
