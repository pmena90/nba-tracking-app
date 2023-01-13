import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsSelectorComponent } from './teams-selector/teams-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamSummaryComponent } from './team-summary/team-summary.component';
import { TeamNamePipe } from '../pipes/team-name.pipe';



@NgModule({
  declarations: [
    TeamsSelectorComponent,
    TeamSummaryComponent,
    TeamSummaryComponent,
    TeamNamePipe
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
