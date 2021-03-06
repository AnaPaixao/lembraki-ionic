import { DecksService } from './../../../services/decks.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
})
export class ArchivedPage implements OnInit {

  @Input('userId') userId: string;
  @Input('groupId') groupId: string;

  constructor(
    private modalCtrl: ModalController,
    private decksService: DecksService
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
