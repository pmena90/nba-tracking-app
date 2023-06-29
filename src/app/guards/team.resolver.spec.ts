import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService, TeamsService } from '../services';

import { TeamResolver } from './team.resolver';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';

describe('TeamResolver', () => {
  let resolver: TeamResolver;
  let teamServiceMock: TeamsService;
  let httpServiceMock: jasmine.SpyObj<HttpService>;
  let routerMock: ActivatedRouteSnapshot;
  let activatedRouteSpy;

  const team1 = {
    id: 1,
    abbreviation: 'BOS',
    city: '',
    conference: '',
    division: '',
    full_name: '',
    name: '',
    games: []
  }

  const team2 = {
    id: 2,
    abbreviation: 'CLE',
    city: '',
    conference: '',
    division: '',
    full_name: '',
    name: '',
    games: []
  }

  beforeEach(() => {
    httpServiceMock = jasmine.createSpyObj('TeamsService', ['get']);
    const stubTeams = of({ data: [team1, team2] });
    httpServiceMock.get.and.returnValue(stubTeams);
    teamServiceMock = new TeamsService(httpServiceMock);



    TestBed.configureTestingModule({
      providers: [
        { provide: TeamsService, useValue: teamServiceMock }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
    });
  });

  it('should be created', () => {
    activatedRouteSpy = {
      paramMap: convertToParamMap({
        teamCode: 'BOS'
      })
    };
    TestBed.overrideProvider(ActivatedRouteSnapshot, { useValue: activatedRouteSpy });

    expect(resolver).toBeTruthy();
  });

  it('resolve with a valid team', () => {
    activatedRouteSpy = {
      paramMap: convertToParamMap({
        teamCode: 'BOS'
      })
    };
    TestBed.overrideProvider(ActivatedRouteSnapshot, { useValue: activatedRouteSpy });
    routerMock = TestBed.inject(ActivatedRouteSnapshot);
    resolver = TestBed.inject(TeamResolver);

    resolver.resolve(routerMock).subscribe(
      team => expect(team?.id).toBe(1)
    );
  });

  it('resolve with an invalid team should not return team', () => {
    activatedRouteSpy = {
      paramMap: convertToParamMap({
        teamCode: 'BOS1'
      })
    };
    TestBed.overrideProvider(ActivatedRouteSnapshot, { useValue: activatedRouteSpy });
    routerMock = TestBed.inject(ActivatedRouteSnapshot);

    resolver.resolve(routerMock).subscribe(
      team => expect(team).toEqual(null)
    );
  });
});
