import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams$ = this.teamsService.trackedTeams$;
  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
  }

}
