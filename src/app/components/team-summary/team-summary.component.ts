import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game, Team } from 'src/app/entities';
import DateHelper from 'src/app/helpers/dates.helper';
import { GamesService, TeamsService } from 'src/app/services';

@Component({
  selector: 'app-team-summary[team]',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent implements OnInit, OnDestroy {
  @Input() team!: Team;
  games!: Game[];
  latestResultsArray: string[] = [];
  avPointsScored: number = 0;
  avPointsAllowed: number = 0;
  sub!: Subscription;

  constructor(
    private teamService: TeamsService,
    private gamesService: GamesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const gameDates: Date[] = DateHelper.getLast12Date();
    const teamId: number = this.team.id;
    this.sub = this.gamesService.getGamesByTeamPerDates([teamId], gameDates).subscribe({
      next: games => {
        this.games = games;
        this.latestResultsArray = this.getLastResults();
        this.avPointsAllowed = this.getAllowedAVG(teamId, games);
        this.avPointsScored = this.getScoredAVG(teamId, games);
      }
    });
  }

  remove(teamId: number) {
    this.teamService.unTrackTeam(teamId);
  }

  navigateToResults(abbreviation: string) {
    this.router.navigate(['results', abbreviation])
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  private getLastResults(): string[] {
    return this.games.map(g => {
      const isLocal: boolean = this.isLocal(this.team.id, g);
      if (isLocal && g.home_team_score > g.visitor_team_score)
        return 'W';
      if (!isLocal && g.home_team_score < g.visitor_team_score)
        return 'W';
      return 'L'
    });
  }

  private getScoredAVG(id: number, games: Game[]): number {
    let scored: number = 0;
    games.forEach(g => {
      if (this.isLocal(id, g)) {
        scored += g.home_team_score;
      } else {
        scored += g.visitor_team_score;
      }
    })

    const total: number = games.length;
    return Math.round(scored / total);
  }

  private getAllowedAVG(id: number, games: Game[]): number {
    let allowed: number = 0;
    games.forEach(g => {
      if (this.isLocal(id, g)) {
        allowed += g.visitor_team_score;
      } else {
        allowed += g.home_team_score;
      }
    })

    const total: number = games.length;
    return Math.round(allowed / total);

  }

  private isLocal(id: number, game: Game) {
    return game.home_team.id == id;
  }
}
