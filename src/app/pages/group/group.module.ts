import { ListComponent } from './list/list.component';
import { ClickStopPropagationDirective } from './../../directives/global/click-stop-propagation.directive';
import { GroupPage } from './group.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [GroupPage, ClickStopPropagationDirective, ListComponent]
})
export class GroupPageModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
