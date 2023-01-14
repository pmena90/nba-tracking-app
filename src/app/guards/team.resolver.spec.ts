import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamsService } from '../services';

import { TeamResolver } from './team.resolver';

describe('TeamResolver', () => {
  let resolver: TeamResolver;
  let teamService: TeamsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ]
    });

    teamService = TestBed.inject(TeamsService);
    teamService = TestBed.inject(TeamsService);

    resolver = TestBed.inject(TeamResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
