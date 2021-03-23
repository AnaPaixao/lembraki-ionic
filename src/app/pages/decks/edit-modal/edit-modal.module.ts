import { ProgressBarComponent } from './../../../components/progress-bar/progress-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditModalPageRoutingModule } from './edit-modal-routing.module';

import { EditModalPage } from './edit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditModalPageRoutingModule
  ],
  declarations: [EditModalPage, ProgressBarComponent]
})
export class EditModalPageModule {}
