import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { WestDivisionEnum, Team, ConferenceEnum, EastDivisionEnum } from 'src/app/entities';
import { TeamsService } from 'src/app/services';

@Component({
  selector: 'app-teams-selector',
  templateUrl: './teams-selector.component.html',
  styleUrls: ['./teams-selector.component.css']
})
export class TeamsSelectorComponent implements OnInit, AfterViewInit {
  conferences: string[] = Object.keys(ConferenceEnum);
  eastDivisions: string[] = Object.keys(EastDivisionEnum);
  westDivisions: string[] = Object.keys(WestDivisionEnum);
  // divisions: string[] = [...this.eastDivisions, ...this.westDivisions];
  divisions!: string[];
  form!: FormGroup;

  constructor(private teamsService: TeamsService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      teamInput: new FormControl('', Validators.required),
      conferenceSelector: new FormControl(''),
      divisionSelector: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  teams$: Observable<Team[]> = this.teamsService.filteredTeams$;
  selectedConferece$ = this.teamsService.changeSelectedConferenceStream$.pipe(
    tap(conference => {
      this.form.patchValue({ conferenceSelector: conference });
      this.setDivisionValues(conference)
    })
  );
  selectedDivision$ = this.teamsService.changeSelectedDivisionStream$.pipe(
    tap(division => {
      this.form.patchValue({ divisionSelector: division });
    })
  );

  trackTeam() {
    const id: number = +this.form.value.teamInput;
    this.teamsService.trackTeam(id);
  }

  onConferenceChange() {
    const conference: string = this.form.value['conferenceSelector'];
    this.setDivisionValues(conference);

    this.teamsService.changeFilterConference(conference);
    this.teamsService.changeFilterDivision("");
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
    this.teamsService.changeFilterDivision(this.form.value['divisionSelector']);
  }

}
