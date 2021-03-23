import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditModalPageRoutingModule } from './edit-modal-routing.module';

import { EditModalPage } from './edit-modal.page';
import { ProgressBarModule } from 'src/app/components/progress-bar/progress-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditModalPageRoutingModule,
    ProgressBarModule
  ],
  declarations: [EditModalPage]
})
export class EditModalPageModule {}
