import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TeamConferencePipe } from 'src/app/pipes/team-conference.pipe';
import { TeamDivisionPipe } from 'src/app/pipes/team-division.pipe';
import { HttpService, TeamsService } from 'src/app/services';

import { TeamsSelectorComponent } from './teams-selector.component';

describe('TeamsSelectorComponent', () => {
  let component: TeamsSelectorComponent;
  let fixture: ComponentFixture<TeamsSelectorComponent>;
  let teamServiceMock: TeamsService;
  let httpServiceMock: jasmine.SpyObj<HttpService>;

  const team1 = {
    id: 1,
    abbreviation: '',
    city: '',
    conference: '',
    division: '',
    full_name: '',
    name: '',
    games: []
  }

  const team2 = {
    id: 2,
    abbreviation: '',
    city: '',
    conference: '',
    division: '',
    full_name: '',
    name: '',
    games: []
  }

  beforeEach(async () => {
    httpServiceMock = jasmine.createSpyObj('TeamsService', ['get']);
    const stubTeams = of({ data: [team1, team2] });
    httpServiceMock.get.and.returnValue(stubTeams);
    teamServiceMock = new TeamsService(httpServiceMock);

    spyOn(teamServiceMock, 'trackTeam');

    await TestBed.configureTestingModule({
      declarations: [TeamsSelectorComponent, TeamConferencePipe, TeamDivisionPipe],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TeamsService, useValue: teamServiceMock }
      ]
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

    component.teams$.subscribe(
      result => {
        expect(result[0].id).toEqual(1);
        expect(result[1].id).toEqual(2);
      }
    )
  });


  it('input-select should have the proper conference options', () => {
    const conferences = component.conferences;
    expect(fixture.nativeElement.querySelector('#conferenceSelector').options.length - 1)
      .toBe(conferences.length);

    for (let index = 0; index < conferences.length; index++) {
      const pipe = new TeamConferencePipe();
      const conferenceText = pipe.transform(conferences[index]);
      const conferenceHtmlText = fixture.nativeElement.querySelector('#conferenceSelector')
        .options[index + 1].textContent.trim();

      expect(conferenceHtmlText).toEqual(conferenceText);
    }
  });


  it('track team', () => {
    const inputSelect = fixture.debugElement.query(By.css('#teamInput')).nativeElement;
    inputSelect.value = inputSelect.options[1].value;
    inputSelect.dispatchEvent(new Event('change'));

    component.trackTeam();

    expect(teamServiceMock.trackTeam).toHaveBeenCalledOnceWith(1);
  });
});
