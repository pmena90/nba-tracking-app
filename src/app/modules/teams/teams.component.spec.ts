import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';
import { TeamSummaryComponent } from 'src/app/components/team-summary/team-summary.component';
import { ConferenceEnum, EastDivisionEnum } from 'src/app/entities';
import { HttpService, TeamsService } from 'src/app/services';
// import { ComponentsModule } from 'src/app/components/components.module';

import { TeamsComponent } from './teams.component';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;
  let teamServiceMock: TeamsService;
  let httpServiceMock: jasmine.SpyObj<HttpService>;
  let routerMock: jasmine.SpyObj<Router>;

  const team1 = {
    id: 1,
    abbreviation: 'BOS',
    city: 'City',
    conference: ConferenceEnum.West,
    division: EastDivisionEnum.Atlantic,
    full_name: 'Name 1',
    name: 'Name 1',
    games: []
  }

  const team2 = {
    id: 2,
    abbreviation: '',
    city: 'City',
    conference: ConferenceEnum.East,
    division: EastDivisionEnum.Central,
    full_name: 'Name 2',
    name: 'Name 2',
    games: []
  }

  const teams = [team1, team2];

  beforeEach(async () => {
    httpServiceMock = jasmine.createSpyObj('TeamsService', ['get']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const stubTeams = of({ data: teams });
    httpServiceMock.get.and.returnValue(stubTeams);
    teamServiceMock = new TeamsService(httpServiceMock);

    await TestBed.configureTestingModule({
      declarations: [TeamsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ComponentsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: TeamsService, useValue: teamServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an app-team-summary component per team in teams array', () => {
    teamServiceMock.trackTeam(team1.id);
    teamServiceMock.trackTeam(team2.id);
    fixture.detectChanges();

    const teamSummaryComponentDEs = fixture.debugElement.queryAll(By.directive(TeamSummaryComponent));

    expect(teamSummaryComponentDEs.length).toBe(2);

    for (let index = 0; index < teams.length; index++) {
      const childComponent = teamSummaryComponentDEs[index].componentInstance;
      expect(childComponent.team.name).toEqual(teams[index].name);
    }
  })

  it('click go to summary should call navigate method with proper params', () => {
    teamServiceMock.trackTeam(team1.id);
    teamServiceMock.trackTeam(team2.id);
    fixture.detectChanges();

    const teamSummaryComponentDEs = fixture.debugElement.queryAll(By.directive(TeamSummaryComponent));
    const firstTeam = teamSummaryComponentDEs[0];
    spyOn(firstTeam.componentInstance, 'navigateToResults');
    firstTeam.query(By.css('#resultsBOS'))
      .triggerEventHandler('click', {});

    expect(firstTeam.componentInstance.navigateToResults).toHaveBeenCalledWith('BOS');

  })

  it('click go to summary should go to team summarys page using Router', () => {
    teamServiceMock.trackTeam(team1.id);
    teamServiceMock.trackTeam(team2.id);
    fixture.detectChanges();

    const teamSummaryComponentDEs = fixture.debugElement.queryAll(By.directive(TeamSummaryComponent));
    const firstTeam = teamSummaryComponentDEs[0];
    firstTeam.query(By.css('#resultsBOS')).triggerEventHandler('click', {});

    expect(firstTeam.componentInstance.router.navigate)
      .toHaveBeenCalledOnceWith(['results', 'BOS']);
  })
});
