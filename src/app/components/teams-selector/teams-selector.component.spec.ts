import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamConferencePipe } from 'src/app/pipes/team-conference.pipe';
import { TeamDivisionPipe } from 'src/app/pipes/team-division.pipe';
import { TeamsService } from 'src/app/services';

import { TeamsSelectorComponent } from './teams-selector.component';

describe('TeamsSelectorComponent', () => {
  let component: TeamsSelectorComponent;
  let fixture: ComponentFixture<TeamsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamsSelectorComponent, TeamConferencePipe, TeamDivisionPipe],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
    })
      .compileComponents();

    TestBed.inject(TeamsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init select values variables', () => {
    expect(component.conferences.length).toBeGreaterThan(0);
    expect(component.eastDivisions.length).toBeGreaterThan(0);
    expect(component.westDivisions.length).toBeGreaterThan(0);
  });
});
