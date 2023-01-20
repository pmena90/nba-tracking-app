import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsSelectorComponent } from './teams-selector/teams-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamSummaryComponent } from './team-summary/team-summary.component';
import { TeamNamePipe } from '../pipes/team-name.pipe';
import { TeamConferencePipe } from '../pipes/team-conference.pipe';
import { TeamGamesResultComponent } from './team-games-result/team-games-result.component';
import { TeamDivisionPipe } from '../pipes/team-division.pipe';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { LastDaysSelectComponent } from './last-days-select/last-days-select.component';



@NgModule({
  declarations: [
    TeamsSelectorComponent,
    TeamSummaryComponent,
    TeamSummaryComponent,
    TeamNamePipe,
    TeamDivisionPipe,
    TeamConferencePipe,
    TeamGamesResultComponent,
    ConfirmationModalComponent,
    LastDaysSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TeamsSelectorComponent,
    TeamSummaryComponent
  ]
})
export class ComponentsModule { }
