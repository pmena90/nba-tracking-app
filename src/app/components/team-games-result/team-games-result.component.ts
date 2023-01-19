import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, mergeMap } from 'rxjs';
import { Game, Team } from 'src/app/entities';
import DateHelper from 'src/app/helpers/dates.helper';
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
    const gameDates: Date[] = DateHelper.getLast12Date();

    this.sub = this.route.data.pipe(
      map(data => data['team'] as Team),
      map(team => {
        this.team = team;
        return team;
      }),
      mergeMap(team => this.gamesService.getGamesByTeamPerDates([team.id], gameDates))
    ).subscribe(games => this.games = games)
  }

  back() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
