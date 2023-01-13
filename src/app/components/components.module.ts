import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsSelectorComponent } from './teams-selector/teams-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamSummaryComponent } from './team-summary/team-summary.component';
import { TeamNamePipe } from '../pipes/team-name.pipe';
import { TeamConferencePipe } from '../pipes/team-conference.pipe';
import { TeamGamesResultComponent } from './team-games-result/team-games-result.component';



@NgModule({
  declarations: [
    TeamsSelectorComponent,
    TeamSummaryComponent,
    TeamSummaryComponent,
    TeamNamePipe,
    TeamConferencePipe,
    TeamGamesResultComponent
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
