import { ProgressBarComponent } from './../../components/progress-bar/progress-bar.component';
import { ListPopoverComponent } from './list-popover/list-popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecksPageRoutingModule } from './decks-routing.module';

import { DecksPage } from './decks.page';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecksPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [DecksPage, ListPopoverComponent, ProgressBarComponent]
})
export class DecksPageModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
