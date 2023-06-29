import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConferenceEnum, EastDivisionEnum } from '../entities';
import { HttpService, TeamsService } from './';

describe('TeamsService', () => {
  let service: TeamsService;
  let httpServiceMock: jasmine.SpyObj<HttpService>;

  const team1 = {
    id: 1,
    abbreviation: '',
    city: '',
    conference: 'East',
    division: EastDivisionEnum.Atlantic,
    full_name: '',
    name: '',
    games: []
  }

  const team2 = {
    id: 2,
    abbreviation: '',
    city: '',
    conference: 'West',
    division: EastDivisionEnum.Central,
    full_name: '',
    name: '',
    games: []
  }


  beforeEach(() => {
    httpServiceMock = jasmine.createSpyObj('TeamsService', ['get']);
    const stubTeams = of({ data: [team1, team2] });
    httpServiceMock.get.and.returnValue(stubTeams);

    service = new TeamsService(httpServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GetTeams should return a list with all the teams (HttpClient called once)', () => {
    service.teams$.subscribe({
      next: result => {
        expect(result.length)
          .withContext('expected teams')
          .toEqual(2);
      },
    });
    expect(httpServiceMock.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('TrackTeam adds the team to the tracked list', () => {
    let count = 0;

    service.trackedTeams$.subscribe({
      next: result => {
        expect(result.length)
          .withContext('expected teams')
          .toEqual(count);
      }
    });

    count++;
    service.trackTeam(1);

    expect(httpServiceMock.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('UnTrackTeam Removes the team from the tracked list', () => {
    let count = 0;

    service.trackedTeams$.subscribe({
      next: result => {
        expect(result.length)
          .withContext('expected teams')
          .toEqual(count);
      }
    });

    count++;
    service.trackTeam(1);
    count--;
    service.unTrackTeam(1);

    expect(httpServiceMock.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('Filtered teams contains all the teams by default', () => {
    service.filteredTeams$.subscribe({
      next: result => {
        expect(result.length)
          .withContext('expected teams')
          .toEqual(2);
      }
    });

    expect(httpServiceMock.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('ChangeFilterConference filters the list of teams by conference', () => {
    let count = 2;
    let selectedConference = ConferenceEnum.East;
    service.filteredTeams$.subscribe({
      next: result => {
        expect(result.length)
          .withContext('expected teams')
          .toEqual(count);

        expect(result[0].conference)
          .withContext('expected team conference')
          .toEqual(selectedConference);
      }
    });

    count = 1;
    // Filter by East -> 1 result
    selectedConference = ConferenceEnum.East;
    service.changeFilterConference(selectedConference);
    // Filter by West -> 1 result
    selectedConference = ConferenceEnum.West;
    service.changeFilterConference(selectedConference);

    expect(httpServiceMock.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('changeFilterDivision filters the list of teams by Division', () => {
    let count = 2;
    let selectedDevision = EastDivisionEnum.Atlantic;
    service.filteredTeams$.subscribe({
      next: result => {
        expect(result.length)
          .withContext('expected teams')
          .toEqual(count);

        expect(result[0].division)
          .withContext('expected team conference')
          .toEqual(selectedDevision);
      }
    });

    count = 1;
    // Filter by East -> 1 result
    selectedDevision = EastDivisionEnum.Atlantic;
    service.changeFilterDivision(selectedDevision);
    // Filter by West -> 1 result
    selectedDevision = EastDivisionEnum.Central;
    service.changeFilterDivision(selectedDevision);

    expect(httpServiceMock.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});
