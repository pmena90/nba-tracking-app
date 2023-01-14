import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Team } from 'src/app/entities';
import { TeamsService } from 'src/app/services';

@Component({
  selector: 'app-teams-selector',
  templateUrl: './teams-selector.component.html',
  styleUrls: ['./teams-selector.component.css']
})
export class TeamsSelectorComponent {
  form: FormGroup = new FormGroup({
    teamInput: new FormControl('', Validators.required),
  });

  constructor(private teamsService: TeamsService) { }

  teams$: Observable<Team[]> = this.teamsService.getTeams();

  trackTeam() {
    const id: number = +this.form.value.teamInput;
    this.teamsService.trackTeam(id);
  }

}
