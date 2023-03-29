import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Team } from 'src/app/entities';
import { TeamConferencePipe } from 'src/app/pipes/team-conference.pipe';
import { TeamNamePipe } from 'src/app/pipes/team-name.pipe';
import { GamesService, TeamsService } from 'src/app/services';
import { TeamSummaryComponent } from './team-summary.component';

describe('TeamSummaryComponent', () => {
  let component: TeamSummaryComponent;
  let team1: Team;
  let teamServiceMock;
  let gameServiceMock;
  let routerMock;

  beforeEach(() => {
    team1 = {
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

    const games = [
      {
        id: 1,
        date: Date.now(),
        home_team: team1,
        home_team_score: 100,
        period: 4,
        postseason: false,
        season: 1,
        status: '',
        time: '',
        visitor_team: team2,
        visitor_team_score: 90,
      },
      {
        id: 2,
        date: Date.now(),
        home_team: team1,
        home_team_score: 100,
        period: 4,
        postseason: false,
        season: 1,
        status: '',
        time: '',
        visitor_team: team2,
        visitor_team_score: 90,
      }
    ]

    gameServiceMock = jasmine.createSpyObj('GamesService', ['changeDaysStream$', 'getGamesByTeamPerDates']);
    const stubDays = of(12);
    const stubGames = of(games);
    gameServiceMock.changeDaysStream$.and.returnValue(stubDays);
    gameServiceMock.getGamesByTeamPerDates.and.returnValue(stubGames);

    teamServiceMock = jasmine.createSpyObj('TeamsService', ['unTrackTeam']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    component = new TeamSummaryComponent(teamServiceMock, gameServiceMock, routerMock);
    component.days$ = stubDays;
    component.team = team1;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init list of games', () => {
    component.ngOnInit();

    expect(component.games.length).toBe(2);
  })

  it('should init getAllowedAVG', () => {
    component.ngOnInit();

    expect(component.avPointsAllowed).toBe(90);
  })

  it('should init getScoredAVG', () => {
    component.ngOnInit();

    expect(component.avPointsScored).toBe(100);
  })

  it('should init latest results', () => {
    component.ngOnInit();

    expect(component.latestResultsArray).toEqual(['W', 'W']);
  })
});
