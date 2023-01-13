import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, retry, Subscription } from 'rxjs';
import { Game } from 'src/app/entities/game';
import { Team } from 'src/app/entities/team';
import DateHelper from 'src/app/helpers/dates.helper';
import { GamesService } from 'src/app/services/games.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-team-summary[team]',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent implements OnInit, OnDestroy {
  @Input() team!: Team;
  games!: Game[];
  latestResultsArray: string[] = [];
  avPointsScored = 0;
  avPointsAllowed = 0;
  sub!: Subscription;

  constructor(
    private teamService: TeamsService,
    private gamesService: GamesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const gameDates: Date[] = DateHelper.getLast12Date();
    const teamId = this.team.id;
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
    this.router.navigate([`results/${abbreviation}`])
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  private getLastResults(): string[] {
    return this.games.map(g => {
      const isLocal = this.isLocal(this.team.id, g);
      if (isLocal && g.home_team_score > g.visitor_team_score)
        return 'W';
      if (!isLocal && g.home_team_score < g.visitor_team_score)
        return 'W';
      return 'L'
    });
  }

  private getScoredAVG(id: number, games: Game[]): number {
    let scored = 0;
    games.forEach(g => {
      if (this.isLocal(id, g)) {
        scored += g.home_team_score;
      } else {
        scored += g.visitor_team_score;
      }
    })

    const total = games.length;
    return Math.round(scored / total);
  }

  private getAllowedAVG(id: number, games: Game[]): number {
    let allowed = 0;
    games.forEach(g => {
      if (this.isLocal(id, g)) {
        allowed += g.visitor_team_score;
      } else {
        allowed += g.home_team_score;
      }
    })

    const total = games.length;
    return Math.round(allowed / total);

  }

  private isLocal(id: number, game: Game) {
    return game.home_team.id == id;
  }
}
