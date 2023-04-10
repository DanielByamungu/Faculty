import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBySkillComponent } from './search-by-skill.component';
import { RouterModule } from '@angular/router';

describe('SearchBySkillComponent', () => {
  let component: SearchBySkillComponent;
  let fixture: ComponentFixture<SearchBySkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBySkillComponent ],
      imports: [RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
