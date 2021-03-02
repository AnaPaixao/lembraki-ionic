import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const toLogin = () => redirectUnauthorizedTo(['/group']);
const isLogged = () => redirectLoggedInTo(['/first-page']);

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
    loadChildren: () => import('./pages/decks/decks.module').then( m => m.DecksPageModule)
  },
  {
    path: 'deck',
    loadChildren: () => import('./pages/deck/deck.module').then( m => m.DeckPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./pages/progress/progress.module').then( m => m.ProgressPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./pages/group/group.module').then( m => m.GroupPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
