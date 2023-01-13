import { Routes } from '@angular/router';
import { TeamGamesResultComponent } from 'src/app/components/team-games-result/team-games-result.component';
import { TeamResolver } from 'src/app/guards/team.resolver';
import { TeamsComponent } from './teams.component';

export const routes: Routes = [
    {
        path: '', component: TeamsComponent,
    },
    {
        path: 'results/:teamCode', component: TeamGamesResultComponent, resolve: {
            team: TeamResolver
        }
    }
];