import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './teams-routing'
import { TeamsComponent } from './teams.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [TeamsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class TeamsModule { }
