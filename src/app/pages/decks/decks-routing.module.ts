import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecksPage } from './decks.page';

const routes: Routes = [
  {
    path: '',
    component: DecksPage
  },  {
    path: 'archived',
    loadChildren: () => import('./archived/archived.module').then( m => m.ArchivedPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecksPageRoutingModule {}
