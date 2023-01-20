import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throws } from 'assert';
import { Observable } from 'rxjs';
import { WestDivisionEnum, Team, ConferenceEnum, EastDivisionEnum } from 'src/app/entities';
import { TeamsService } from 'src/app/services';

@Component({
  selector: 'app-teams-selector',
  templateUrl: './teams-selector.component.html',
  styleUrls: ['./teams-selector.component.css']
})
export class TeamsSelectorComponent implements OnInit {
  form: FormGroup = new FormGroup({
    teamInput: new FormControl('', Validators.required),
    conferenceSelector: new FormControl(''),
    divisionSelector: new FormControl(''),
  });

  conferences: string[] = Object.keys(ConferenceEnum);
  eastDivisions: string[] = Object.keys(EastDivisionEnum);
  westDivisions: string[] = Object.keys(WestDivisionEnum);
  divisions: string[] = [...this.eastDivisions, ...this.westDivisions];

  constructor(private teamsService: TeamsService) {
    console.log(this.conferences);
  }

  teams$: Observable<Team[]> = this.teamsService.filteredTeams$;
  // selectedConferece$!: Observable<string>;
  selectedConferece$ = this.teamsService.changeSelectedConferenceStream$;
  selectedDivision$ = this.teamsService.changeSelectedDivisionStream$;

  ngOnInit(): void {
    // this.selectedConferece$ = this.teamsService.changeSelectedConferenceStream$;

    this.selectedConferece$.subscribe(c => {
      this.form.patchValue({
        conferenceSelector: c
      });
      this.setDivisionValues(c);
    });

    this.selectedDivision$.subscribe(d => {
      this.form.patchValue({
        divisionSelector: d
      })
    })

  }

  trackTeam() {
    const id: number = +this.form.value.teamInput;
    this.teamsService.trackTeam(id);
  }

  onConferenceChange() {
    const conference: string = this.form.value['conferenceSelector'];
    this.setDivisionValues(conference);

    this.teamsService.changeFilterConference(conference);
  }

  setDivisionValues(conference: string) {
    if (conference == ConferenceEnum.East.toString()) {
      this.divisions = [...this.eastDivisions];
    }
    if (conference == ConferenceEnum.West.toString()) {
      this.divisions = [...this.westDivisions];
    }
    if (conference === "") {
      this.divisions = [...this.eastDivisions, ...this.westDivisions];
    }
  }

  onDivisionChange() {
    console.log(this.form.value['divisionSelector']);
    this.teamsService.changeFilterDivision(this.form.value['divisionSelector']);
  }

}
