import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Game } from 'src/app/entities/game';
import { Team } from 'src/app/entities/team';
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
  constructor(private teamService: TeamsService, private gamesService: GamesService) { }

  ngOnInit(): void {
    const gameDates: Date[] = this.getLast12Date();
    const teamId = this.team.id;
    this.sub = this.gamesService.getGamesByTeamPerDates([teamId], gameDates).subscribe({
      next: games => {
        this.games = games;
        this.latestResultsArray = this.getLastResults();
      }
    });
  }

  remove(teamId: number) {
    this.teamService.unTrackTeam(teamId);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private getLastResults(): string[] {
    return this.games.map(g => {
      const isLocal = g.home_team.id == this.team.id;
      if (isLocal && g.home_team_score > g.visitor_team_score)
        return 'W';
      if (!isLocal && g.home_team_score < g.visitor_team_score)
        return 'W';
      return 'L'
    });
  }

  private getLast12Date() {
    let currentDate = new Date();
    let endDate = new Date();
    endDate = new Date(endDate.setDate(currentDate.getDate() - 12));
    return this.getDates(currentDate, endDate);
  }

  private getDates(startDate: Date, stopDate: Date) {
    let dateArray: Date[] = new Array();
    let currentDate = startDate;
    while (currentDate > stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1));

    }
    return dateArray;
  }

}
