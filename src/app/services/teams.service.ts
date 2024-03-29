import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable, startWith, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../Interfaces/IResponse';
import { Team } from '../entities';
import { HttpService } from './';

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

  private changeSelectedConferenceSubject = new BehaviorSubject<string>("");
  changeSelectedConferenceStream$ = this.changeSelectedConferenceSubject.asObservable();

  private changeSelectedDivisionSubject = new BehaviorSubject<string>("");
  changeSelectedDivisionStream$ = this.changeSelectedDivisionSubject.asObservable();

  constructor(private http: HttpService) { }

  teams$ = this.getTeams();

  private getTeams(): Observable<Team[]> {
    const apiUrl = `${this.apiUrl}/teams`;

    return this.http.get<IResponse<Team[]>>(apiUrl).pipe(
      map(result => result.data ? result.data : []),
      map(data => data.map(team => ({
        ...team,
        img: team.abbreviation == '' ? '' : this.imgBaseUrl + team.abbreviation + '.png'
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

  changeFilterConference(conference: string) {
    this.changeSelectedConferenceSubject.next(conference);
  }

  changeFilterDivision(division: string) {
    this.changeSelectedDivisionSubject.next(division);
  }


  trackedTeams$ = combineLatest([
    this.teams$,
    this.teamSelectedStream$
  ]).pipe(
    map(([teams, op]) => {
      const team = teams.find(t => t.id == op.id)
      if (team && op.op === 'add') {
        this.selectedTeams.push(team);
      }
      if (team && op.op === 'remove') {
        const index = this.selectedTeams.findIndex(i => i.id === team.id);
        if (index !== -1)
          this.selectedTeams.splice(index, 1);
      }
      return this.selectedTeams;

    }),
    catchError(err => {
      this.handleError(err);
      return EMPTY
    }),
  );

  filteredTeams$ = combineLatest([
    this.teams$,
    this.changeSelectedConferenceStream$,
    this.changeSelectedDivisionStream$
  ]).pipe(
    map(([teams, conference, division]) => {
      return teams
        .filter(t => conference !== "" ? t.conference === conference : true)
        .filter(t => division !== "" ? t.division === division : true);
    })
  );

  private handleError(err: HttpErrorResponse) {
    let errorMessage = err.message;
    console.error(errorMessage);
  }

}