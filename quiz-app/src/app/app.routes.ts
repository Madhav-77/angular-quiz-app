import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../app/signin/signin.component').then(mod => mod.SigninComponent)
    },
    {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () => import('../app/home/home.component').then(mod => mod.HomeComponent)
    },
    {
        path: 'create-quiz',
        canActivate: [authGuard],
        loadComponent: () => import('../app/create-quiz/create-quiz.component').then(mod => mod.CreateQuizComponent)
    },
    {
        path: 'start-quiz/:id',
        canActivate: [authGuard],
        loadComponent: () => import('../app/start-quiz/start-quiz.component').then(mod => mod.StartQuizComponent)
    }
];
