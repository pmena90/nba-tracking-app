import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Team } from '../entities/team';
import { TeamsService } from '../services/teams.service';

@Injectable({
  providedIn: 'root'
})
export class TeamResolver implements Resolve<Team | null> {
  constructor(private teamsService: TeamsService, private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Team | null> {
    let abbreviation = route.paramMap.get('teamCode') ?? '';
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
