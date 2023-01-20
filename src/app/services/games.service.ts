import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../Interfaces/IResponse';
import { Game } from '../entities/game';
import { HttpService } from './http.service';
import DateHelper from '../helpers/dates.helper';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly apiUrl = environment.apiUrl;

  private changeDaysSubject = new BehaviorSubject<number>(12);
  changeDaysStream$ = this.changeDaysSubject.asObservable();

  constructor(private http: HttpService) { }

  changeDays(days: number) {
    this.changeDaysSubject.next(days);
  }

  getGamesByTeamPerDates(teamIds: number[], dates: number): Observable<Game[]> {
    const gameDates: Date[] = DateHelper.getLastDates(dates);

    const apiUrl = `${this.apiUrl}/games`;

    let params = new HttpParams();
    gameDates.forEach(date => {
      params = params.append('dates[]', date.toDateString());
    });
    teamIds.forEach(id => {
      params = params.append('team_ids[]', id);
    });

    return this.http.get<IResponse<Game[]>>(apiUrl, params).pipe(
      map(result => result.data ? result.data : []),
      map(games => games.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )),
      catchError(err => {
        this.handleError(err);
        return EMPTY;
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = err.message;
    console.error(errorMessage);
  }
}
