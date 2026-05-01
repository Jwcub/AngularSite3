import { Routes } from '@angular/router';
import { Schedule } from './schedule/schedule';

export const routes: Routes = [
    { path: "schedule", component: Schedule },
    { path: "", redirectTo: "/schedule", pathMatch: 'full'}
];
