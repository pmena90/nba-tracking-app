import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, mergeMap, concat, concatMap } from 'rxjs';
import { Game, Team } from 'src/app/entities';
import { GamesService } from 'src/app/services';

@Component({
  selector: 'app-team-games-result',
  templateUrl: './team-games-result.component.html',
  styleUrls: ['./team-games-result.component.css']
})
export class TeamGamesResultComponent implements OnInit, OnDestroy {
  team: Team | undefined;
  games!: Game[];
  sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.data.pipe(
      map(data => data['team'] as Team),
      map(team => {
        this.team = team;
        return team;
      }),
      mergeMap(team => {
        return this.gamesService.changeDaysStream$.pipe(
          mergeMap(days => {
            return this.gamesService.getGamesByTeamPerDates([team.id], days)
          }));
      }),
    ).subscribe(games => this.games = games)
  }

  days$ = this.gamesService.changeDaysStream$;

  changeNumberOfDates(numberOfDates: number) {
    this.gamesService.changeDays(numberOfDates);
  }

  back() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
