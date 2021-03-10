import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from 'src/app/classes/card';


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit {

  @Input('userId') userId: string;
  @Input('groupId') groupId: string;
  @Input('deckId') deckId: string;
  @Input('card') card: Card;

  constructor(
    private modalController: ModalController,
    private cardsService: CardsService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalController.dismiss();
  }

  updateCard(){
    try {
      this.cardsService.updateCard(this.userId, this.groupId, this.deckId, this.card.id, this.card)
      this.modalController.dismiss();
    } catch (e) {
      console.error(e);
    }
  }

  deleteCard(){
    this.alertConfirmDelete();
  }

  async alertConfirmDelete() {
    const alert = await this.alertController.create({
      cssClass: 'alert-confirm-delete',
      header: 'Deletar carta',
      message: 'Tem certeza que deseja <strong>deletar</strong> essa carta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            try {
              this.cardsService.deleteCard(this.userId, this.groupId, this.deckId, this.card.id);
              this.modalController.dismiss();
            } catch (e) {
              console.error(e)
            }
          },
        },
      ],
    });

    await alert.present();
  }

}
