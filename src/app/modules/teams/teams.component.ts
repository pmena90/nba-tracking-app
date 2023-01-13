import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  constructor(private teamsService: TeamsService) { }
  teams$ = this.teamsService.trackedTeams$;
}
