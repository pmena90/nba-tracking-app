import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { Game } from 'src/app/entities/game';
import { Team } from 'src/app/entities/team';
import DateHelper from 'src/app/helpers/dates.helper';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-team-games-result',
  templateUrl: './team-games-result.component.html',
  styleUrls: ['./team-games-result.component.css']
})
export class TeamGamesResultComponent implements OnInit, OnDestroy {
  team: Team | undefined;
  games!: Game[];
  sub1!: Subscription;
  sub2!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private router: Router
  ) { }

  ngOnInit() {
    const gameDates: Date[] = DateHelper.getLast12Date();

    this.sub1 = this.route.data.pipe(
      map(data => data['team'] as Team),
    ).subscribe(team => {
      this.team = team;
      this.sub2 = this.gamesService.getGamesByTeamPerDates([this.team.id], gameDates).pipe(
        tap(games => console.log(games))
      )
        .subscribe(
          games => this.games = games
        )
    });
  }

  back() {
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }
}
