import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../app/signin/signin.component').then(mod => mod.SigninComponent)
        // canActivate: [domainGuard],
    },
    {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () => import('../app/home/home.component').then(mod => mod.HomeComponent)
        // canActivate: [domainGuard],
    }
];
