import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Team } from '../entities';
import { TeamsService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class TeamResolver implements Resolve<Team | null> {
  constructor(private teamsService: TeamsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Team | null> {
    let abbreviation: string = route.paramMap.get('teamCode') ?? '';
    return this.teamsService.getTeams().pipe(
      map(teams => teams.find(t => t.abbreviation == abbreviation)),
      map(team => {
        if (team)
          return team;
        else {
          alert('Team cannot be found');
          this.router.navigate(['/']);
          return null;
        }
      })
    );
  }
}
