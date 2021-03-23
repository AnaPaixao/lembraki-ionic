import { AppModule } from './../../app.module';
import { ListPopoverComponent } from './list-popover/list-popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecksPageRoutingModule } from './decks-routing.module';

import { DecksPage } from './decks.page';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ProgressBarModule } from 'src/app/components/progress-bar/progress-bar.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecksPageRoutingModule,
    FontAwesomeModule,
    ProgressBarModule
  ],
  declarations: [DecksPage, ListPopoverComponent],
})
export class DecksPageModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
