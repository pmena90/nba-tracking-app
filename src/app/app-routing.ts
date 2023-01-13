import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./modules').then(m => m.TeamsModule)
    }
]