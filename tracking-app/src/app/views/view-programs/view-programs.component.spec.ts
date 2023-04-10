import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { NavlinkComponent } from 'src/app/components/navlink/navlink.component';
import { ViewProgramsComponent } from './view-programs.component';

describe('ViewProgramsComponent', () => {
  let component: ViewProgramsComponent;
  let fixture: ComponentFixture<ViewProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProgramsComponent, NavbarComponent, NavlinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
