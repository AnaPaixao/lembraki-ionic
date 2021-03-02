import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const toLogin = () => redirectUnauthorizedTo(['/first-page']);
const isLogged = () => redirectLoggedInTo(['/group']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'first-page',
    pathMatch: 'full'
  },
  {
    path: 'first-page',
    loadChildren: () => import('./pages/first-page/first-page.module').then( m => m.FirstPagePageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: isLogged }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: isLogged }
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: isLogged }
  },
  {
    path: 'decks',
    loadChildren: () => import('./pages/decks/decks.module').then( m => m.DecksPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'deck',
    loadChildren: () => import('./pages/deck/deck.module').then( m => m.DeckPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'progress',
    loadChildren: () => import('./pages/progress/progress.module').then( m => m.ProgressPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'group',
    loadChildren: () => import('./pages/group/group.module').then( m => m.GroupPageModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
