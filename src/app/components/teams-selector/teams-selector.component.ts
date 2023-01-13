import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { Team } from 'src/app/entities/team';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams-selector',
  templateUrl: './teams-selector.component.html',
  styleUrls: ['./teams-selector.component.css']
})
export class TeamsSelectorComponent {
  form = new FormGroup({
    teamInput: new FormControl('', Validators.required),
  });

  constructor(private teamsService: TeamsService) { }

  teams$ = this.teamsService.getTeams();

  trackTeam() {
    const id = +this.form.value.teamInput;
    this.teamsService.trackTeam(id);
  }

}
