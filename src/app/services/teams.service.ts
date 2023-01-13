import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, EMPTY, map, Observable, tap, startWith, Subject, BehaviorSubject, of, switchMap, share } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../Interfaces/IResponse';
import { Team } from '../entities/team';
import { HttpService } from './http.service';
import { GamesService } from './games.service';

interface Op {
  op: 'add' | 'remove';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private readonly apiUrl = environment.apiUrl;
  private readonly imgBaseUrl = environment.imgBaseUrl;

  private teamSelectedSubject = new Subject<Op>();
  teamSelectedStream$ = this.teamSelectedSubject.asObservable()
    .pipe(startWith({ op: 'add', id: 0 }));

  selectedTeams: Team[] = [];
  private teamsListSubject = new BehaviorSubject<Team[]>(this.selectedTeams);
  teamsListStream$ = this.teamsListSubject.asObservable();

  constructor(private http: HttpService, private gamesService: GamesService) { }

  getTeams(): Observable<Team[]> {
    const apiUrl = `${this.apiUrl}/teams`;

    console.log('getTeams call');

    return this.http.get<IResponse<Team[]>>(apiUrl).pipe(
      map(result => result.data ? result.data : []),
      map(data => data.map(team => ({
        ...team,
        img: this.imgBaseUrl + team.abbreviation + '.png'
      } as Team))),
      catchError(err => {
        this.handleError(err);
        return EMPTY;
      })
    );
  }

  trackTeam(id: number) {
    const op = { op: 'add', id } as Op;
    if (!this.selectedTeams.find(t => t.id == id))
      this.teamSelectedSubject.next(op);
  }

  unTrackTeam(id: number) {
    const op = { op: 'remove', id } as Op;

    if (this.selectedTeams.find(t => t.id == id)) {
      this.teamSelectedSubject.next(op);
    }
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = err.message;
    console.error(errorMessage);
  }

  private unTrackTeamSubject = new Subject<Op>();
  unTrackTeamStream$: Observable<Op> = this.unTrackTeamSubject.asObservable();

  trackedTeams$ = combineLatest([
    this.getTeams(),
    this.teamSelectedStream$
  ]).pipe(
    map(([teams, op]) => {
      const team = teams.filter(t => t.id == op.id)
      if (team[0] && op.op === 'add') {
        this.selectedTeams.push(team[0]);
      }
      if (team[0] && op.op === 'remove') {
        const index = this.selectedTeams.indexOf(team[0]);
        console.log(index);
        this.selectedTeams.splice(index, 1);
      }
      return this.selectedTeams;

    }),

    catchError(err => {
      this.handleError(err);
      return EMPTY
    }),
  );

}