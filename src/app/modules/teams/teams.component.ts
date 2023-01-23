import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from 'src/app/entities';
import { TeamsService } from 'src/app/services';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  constructor(private teamsService: TeamsService) { }
  teams$: Observable<Team[]> = this.teamsService.trackedTeams$;
}
