import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import DateHelper from '../helpers/dates.helper';

import { GamesService } from './games.service';

describe('GamesService', () => {
  let service: GamesService;
  let httpTestingController: HttpTestingController;

  const team1 = {
    id: 1,
    abbreviation: '',
    city: '',
    conference: '',
    division: '',
    full_name: '',
    name: 'Name 1',
    games: []
  }

  const team2 = {
    id: 2,
    abbreviation: '',
    city: '',
    conference: '',
    division: '',
    full_name: '',
    name: 'Name 2',
    games: []
  }
  const games = [
    {
      id: 1,
      date: new Date("12-12-2023"),
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
      date: new Date("12-12-2023"),
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(GamesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getGamesByTeamPerDates', () => {
    it('should call the api with the propper URL', () => {
      service.getGamesByTeamPerDates([1, 2], 2).subscribe(
        result => expect(result.length).toBe(2)
      );

      const gameDates: Date[] = DateHelper.getLastDates(2);
      let params = new HttpParams();
      gameDates.forEach(date => {
        params = params.append('dates[]', date.toDateString());
      });
      [1, 2].forEach(id => {
        params = params.append('team_ids[]', id);
      });

      const req = httpTestingController.expectOne(environment.apiUrl + '/games?' + params.toString());
      req.flush({ data: games });
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    })
  })
});
