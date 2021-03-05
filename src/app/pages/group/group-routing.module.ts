import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupPage } from './group.page';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

const routes: Routes = [
  {
    path: '',
    component: GroupPage
  },  {
    path: 'archived',
    loadChildren: () => import('./archived/archived.module').then( m => m.ArchivedPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes),
    FontAwesomeModule],
  exports: [RouterModule],
})
export class GroupPageRoutingModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
